"""全量知识点深度升级。

把原先的短摘要/通用模板升级为分章节、分题型的完整讲义，并新增：
关键要点、案例应用、易错辨析、专项训练、自测题。脚本幂等，不修改掌握度、复习记录和用户数据。
"""
from __future__ import annotations

import hashlib
import re
import sqlite3
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from database import DB_PATH
QUALITY_VERSION = 2
SOURCE = "佳乐考研考研知识库·深度整理版 v2；动态范围以报考年度正式大纲、招生目录和官方通知为准"

NEW_COLUMNS = {
    "base_content": "TEXT",
    "key_points": "TEXT",
    "case_analysis": "TEXT",
    "common_mistakes": "TEXT",
    "training_steps": "TEXT",
    "self_test": "TEXT",
    "quality_version": "INTEGER DEFAULT 0",
}

@dataclass(frozen=True)
class Profile:
    kind: str
    objective: str
    scenario: str
    boundary: str
    lenses: tuple[str, str, str, str]

P = Profile
CHAPTER_PROFILES: dict[str, Profile] = {
    "ch_xc_cbs_base": P("theory", "建立传播学概念、过程、学派与研究范式的总框架", "分析一项公共议题从信息产生到社会反馈的全过程", "区分日常经验描述、规范判断与可检验的传播学解释", ("概念边界", "传播过程", "社会结构", "研究证据")),
    "ch_xc_cbs_type": P("type", "按主体规模、关系结构、反馈速度和媒介条件辨认传播类型", "判断一次家庭讨论、组织会议、直播事件分别属于何种传播", "同一事件可叠加多种传播类型，分类依据必须明确", ("参与主体", "关系结构", "反馈形态", "时空范围")),
    "ch_xc_cbs_model": P("model", "用图示还原传播要素、方向、反馈、噪音和社会环境", "把一条短视频从创作者、平台分发到评论反馈画成传播模型", "模式是分析工具而非现实复制品，不能忽略适用条件", ("要素构成", "信息方向", "反馈噪音", "系统环境")),
    "ch_xc_cbs_comm": P("production", "解释传播者如何在组织、职业规范、信源和平台规则中生产内容", "追踪突发事件新闻从线索、采访、编辑到算法分发的选择过程", "不能把内容偏向只归因于记者个人，也不能把平台技术视为中立", ("行动主体", "组织惯例", "制度权力", "技术把关")),
    "ch_xc_cbs_media": P("media", "理解媒介技术、形式、可供性和基础设施如何重塑社会实践", "比较同一信息在报纸、短视频和生成式AI界面的不同表达与影响", "避免技术决定论，也不能忽略技术物质性和平台架构", ("媒介形式", "感知方式", "行动可能", "社会后果")),
    "ch_xc_cbs_aud": P("audience", "从被动接收者、积极解释者到数据化劳动者理解受众", "分析粉丝社群在内容消费、再创作、数据劳动和情感动员中的角色", "区分受众能动性与平台结构限制，不能只强调其中一端", ("使用动机", "意义解读", "参与生产", "数据权力")),
    "ch_xc_cbs_effect": P("effect", "掌握媒介效果的作用对象、心理或社会机制、条件变量和证据", "用一个公共卫生或社会治理议题检验媒介如何影响认知、态度和行为", "区分相关关系与因果关系，区分短期效果与长期累积效果", ("作用对象", "发生机制", "条件变量", "效果层级")),
    "ch_xc_cbs_crit": P("critical", "揭示传播背后的资本、权力、意识形态、表征和不平等", "分析平台商业模式如何同时塑造内容可见性、用户劳动和公共讨论", "批判不等于价值口号，必须指出权力机制、利益主体和替代可能", ("权力主体", "资本逻辑", "意义生产", "社会不平等")),
    "ch_xc_cbs_intl": P("international", "解释跨国信息流动、文化权力、国家形象和全球平台治理", "比较同一中国议题在不同国家媒体和平台中的叙事差异", "避免把国际传播简化为单向宣传，需考虑文化语境和受众反馈", ("流动结构", "文化差异", "国家叙事", "平台规则")),
    "ch_xc_xw_base": P("news_theory", "把握新闻本质、价值、真实性、舆论、自由与专业责任", "判断一条热点内容是否构成新闻以及其公共价值与真实性风险", "新闻价值不等于流量价值，客观性不等于无立场或机械平衡", ("事实基础", "公共价值", "专业规范", "社会责任")),
    "ch_xc_xw_biz": P("practice", "把采访、写作、编辑、评论和策划转化为可执行业务流程", "围绕校园或城市公共事件完成选题、采访、写作、编辑与发布", "业务规范必须服务事实准确、信息清晰和公共利益", ("任务目标", "操作流程", "成品标准", "复核纠错")),
    "ch_xc_xw_sys": P("ethics", "理解新闻制度、自由边界、法律责任和伦理冲突的协调", "处理隐私保护、公共利益、未成年人和算法分发之间的冲突", "合法不必然等于合乎伦理，公共利益也不能成为无限侵权理由", ("权利义务", "制度约束", "伦理权衡", "责任追溯")),
    "ch_xc_xw_hist": P("history", "以时间线、媒介制度、代表人物和社会背景理解新闻传播史", "把某一报刊、广播制度或新闻思想放回其政治社会环境中评价", "历史评价要避免用今天标准简单裁判，也不能只背年份与人物", ("历史背景", "关键事件", "制度变化", "历史影响")),
    "ch_xc_wl_base": P("digital", "解释连接、互动、平台化、数据化和网络舆论的运行规律", "追踪一个网络事件在社交平台中的扩散、情绪聚合与治理响应", "去中心化不等于没有中心，互动增加也不自动带来平等参与", ("网络结构", "扩散机制", "用户参与", "治理风险")),
    "ch_xc_wl_newmedia": P("digital", "掌握社交媒体、短视频、直播、社群和沉浸媒介的形态逻辑", "比较短视频、直播和社区平台在内容生产与商业转化上的差异", "不能用单一技术标签解释复杂的新媒体实践", ("产品形态", "内容语法", "用户场景", "商业治理")),
    "ch_xc_wl_tech": P("technology", "理解算法、大数据、人工智能的基本机制及传播后果", "分析推荐系统或生成式AI如何影响信息生产、分发、信任和责任", "技术效率不能替代真实性、公平、透明和可问责要求", ("技术原理", "数据输入", "传播影响", "伦理治理")),
    "ch_xc_wl_fusion": P("fusion", "理解内容、渠道、组织、流程、技术和服务的系统融合", "为地方融媒体设计采集、加工、多端分发与公共服务流程", "媒体融合不是账号叠加或设备更新，而是组织与业务再造", ("组织协同", "流程再造", "产品分发", "公共服务")),
    "ch_xc_ad_base": P("advertising", "掌握广告功能、受众、创意、品牌和效果评价基础", "分析一个品牌广告如何完成定位、诉求、创意表达和效果转化", "广告传播效果不能只看曝光量，商业目标与社会责任需同时评价", ("传播目标", "受众洞察", "创意表达", "效果评估")),
    "ch_xc_ad_plan": P("ad_practice", "把市场分析、定位、创意、媒介和评估组织成广告方案", "为一项校园公益或新消费产品制作完整广告策划案", "策略、创意和媒介必须由同一目标贯穿，不能彼此割裂", ("市场问题", "策略定位", "创意执行", "媒介评估")),
    "ch_xc_pr": P("public_relations", "处理组织与公众关系、形象、议题和危机沟通", "为组织舆情危机制定事实核查、回应、行动和关系修复方案", "公关不是包装或删帖，核心是基于事实解决关系与信任问题", ("组织目标", "公众识别", "沟通行动", "关系修复")),
    "ch_xc_mgmt": P("management", "从产品、用户、收入、成本和组织能力理解媒介经营", "评估一家内容平台或地方媒体的商业模式和公共价值", "媒介经营不能只追求流量变现，还要考虑内容质量与长期信任", ("价值主张", "用户市场", "收入成本", "组织治理")),
    "ch_xc_method": P("research", "把研究问题转化为概念、变量、样本、资料和分析程序", "围绕短视频使用与青年公共参与设计一项可执行研究", "方法选择必须服从研究问题，不能先选方法再拼凑问题", ("研究问题", "概念测量", "资料样本", "效度伦理")),
    "ch_xc_practice": P("practice", "完成适合多平台传播的消息、评论、策划、数据和融合产品", "将一组公共数据制作成消息、可视化和移动端融合报道", "形式创新必须建立在事实核验、叙事清晰和用户需求之上", ("事实核验", "叙事结构", "多模态表达", "发布复盘")),
    "ch_xc_hot": P("frontier", "分析平台社会、算法、生成式AI和数字公共领域等前沿问题", "用近期平台或智能媒体现象连接经典理论并提出治理方案", "前沿概念不能只追热点，必须回到机制、证据和理论来源", ("现象界定", "理论连接", "利益影响", "治理路径")),
    "ch_pol_my_phil": P("philosophy", "理解马克思主义哲学命题的条件、关系、方法论与材料对应", "从科技创新、生态治理或个人成长材料中识别哲学原理", "反对把辩证法写成万能套话，必须说明矛盾双方和具体条件", ("基本命题", "辩证关系", "成立条件", "方法论")),
    "ch_pol_my_pe": P("economics", "沿商品、货币、资本、剩余价值到资本主义矛盾建立逻辑链", "用企业生产、资本周转或市场竞争材料还原政治经济学关系", "区分价值与价格、劳动与劳动力、剩余价值与利润等概念", ("经济范畴", "形成条件", "运动过程", "矛盾结果")),
    "ch_pol_my_soc": P("socialism", "理解科学社会主义的理论依据、现实力量和历史趋势", "从资本主义新变化和社会主义实践材料分析历史发展趋势", "历史必然性不等于自动实现，必须说明主体力量和现实条件", ("理论来源", "阶级力量", "历史规律", "实践条件")),
    "ch_pol_mao": P("political_theory", "把毛泽东思想放入中国革命和建设具体实践中理解", "根据革命阶段、社会性质和力量关系判断路线与策略", "必须区分新民主主义革命与社会主义革命的任务和性质", ("时代条件", "革命对象", "动力道路", "经验方法")),
    "ch_pol_deng": P("political_theory", "理解中国特色社会主义理论形成的实践问题和核心回答", "从改革、发展、市场与社会主义关系材料中提取理论要点", "改革开放不是改变社会主义方向，而是制度自我完善和发展", ("现实问题", "理论回答", "制度创新", "发展意义")),
    "ch_pol_xi": P("political_theory", "掌握新时代治国理政各领域之间的系统联系", "围绕高质量发展、共同富裕、国家安全等材料组织分析", "避免把政策术语并列堆砌，要说明目标、问题、举措和关系", ("时代方位", "核心问题", "战略部署", "实践要求")),
    "ch_pol_hist_old": P("political_history", "以社会性质、主要矛盾和救亡探索评价近代历史事件", "比较不同阶级和政治力量的救国方案及其成败", "既要看到历史进步性，也要指出阶级和时代局限", ("社会背景", "主张行动", "结果原因", "历史启示")),
    "ch_pol_hist_new": P("political_history", "理解中国共产党领导新民主主义革命的发展脉络", "把重大会议、统一战线、武装斗争和党的建设放入时间线", "事件记忆必须与革命阶段、路线转变和历史意义对应", ("时间节点", "主要矛盾", "路线策略", "历史意义")),
    "ch_pol_hist_soc": P("political_history", "把过渡、改造、建设探索、改革开放和新时代连成历史主线", "分析制度建立、道路探索和改革发展的内在连续性", "不能割裂改革前后两个历史时期，也不能忽略探索中的曲折", ("阶段任务", "制度变化", "实践探索", "经验成就")),
    "ch_pol_thought": P("ethics_politics", "把人生价值、理想、道德规范与现实行为选择连接", "分析网络交往、职业选择、公共生活中的价值冲突", "道德判断既要有价值原则，也要说明具体行为和责任", ("价值原则", "行为规范", "现实冲突", "实践养成")),
    "ch_pol_law": P("law", "理解法的本质、法治体系、权利义务和法治思维", "用公共治理或个人权利案例分析法律关系和程序要求", "权利与义务统一，实体正义与程序正义都不能忽略", ("法律规范", "权利义务", "程序运行", "法治实践")),
    "ch_pol_current": P("current", "按主题、时间和中国立场整理年度时政与世界政治", "用当年度重要会议、政策和国际事件训练材料分析", "动态事实必须使用报考年度官方资料，本库只提供稳定框架", ("事件事实", "理论依据", "中国立场", "现实意义")),
    "ch_eng_vocab": P("vocab", "在真题语境中掌握词义、搭配、词性、同义替换和复现", "从阅读句子中判断一个熟词的具体含义和替换表达", "词汇记忆不能脱离句法和语境，也不能只记一个中文释义", ("语境词义", "词性搭配", "同义替换", "复现运用")),
    "ch_eng_grammar": P("grammar", "识别句子骨架、从句、非谓语和特殊结构的语法功能", "拆解一条考研长句并说明每个成分修饰谁", "术语识别必须服务理解，不能只背规则不判断句中功能", ("结构标志", "句法功能", "修饰关系", "语义影响")),
    "ch_eng_long": P("syntax", "按主干、从句、非谓语、插入和指代逐层拆解长句", "对一条含多重修饰的真题句完成切分、还原和翻译", "不能按单词顺序硬译，必须先确定结构层级和逻辑关系", ("主干定位", "边界切分", "指代逻辑", "中文重组")),
    "ch_eng_read": P("reading", "以题干、定位、同义改写和选项证据完成阅读判断", "在限定时间内定位证据句并逐项排除干扰项", "答案依据必须回到文本，常识正确不等于符合作者表达", ("题型识别", "证据定位", "改写判断", "干扰排除")),
    "ch_eng_trans": P("translation", "完成结构切分、词义选择、逻辑显化和中文重组", "翻译一条含定语、被动和名词化结构的真题句", "准确优先于文采，既不能漏译逻辑也不能随意增译观点", ("结构理解", "词义确定", "逻辑转换", "中文表达")),
    "ch_eng_new": P("new_question", "利用段落主题、关键词复现和篇章衔接完成匹配", "在小标题匹配或多项对应中确定段落与选项的唯一关系", "不能只凭单词重合，应验证选项范围和段落中心是否一致", ("段落主旨", "信息对应", "衔接线索", "范围排除")),
    "ch_eng_write": P("writing", "按任务、对象、结构、内容和语言完成英语二写作", "在规定时间内完成一篇应用文或图表作文并按清单修改", "模板只能提供结构，内容必须回应题目，避免空泛万能句", ("任务审题", "段落功能", "内容展开", "语言检查")),
    "ch_eng_cloze": P("cloze", "结合语篇主旨、逻辑关系、词义搭配和语法线索选择答案", "先通读再逐空判断，最后回到整篇验证语义连贯", "局部搭配正确不代表全文成立，必须同时检查上下文逻辑", ("语篇主线", "逻辑衔接", "词义搭配", "整体复核")),
}

GENERIC_MARKERS = (
    "先明确概念提出的背景、适用对象和边界",
    "判断该原理在理论体系中的位置",
    "用材料中的关键词对应原理",
    "先判断空格承担的语法成分",
)

KIND_LABELS = {
    "theory": (("概念坐标", "理论展开", "关系机制", "适用边界", "现实解释"), ("问题意识", "核心命题", "分析层次", "比较辨析", "应用路径")),
    "type": (("类型判定", "结构特征", "互动机制", "相邻类型", "场景判断"),),
    "model": (("模型目的", "构成要素", "信息路径", "优势局限", "图示应用"),),
    "production": (("生产主体", "选择过程", "组织约束", "技术介入", "责任评价"),),
    "media": (("理论命题", "媒介属性", "感知变化", "社会重组", "理论限度"),),
    "audience": (("受众位置", "使用动机", "意义协商", "参与劳动", "结构限制"),),
    "effect": (("效果命题", "作用机制", "发生条件", "证据测量", "现实检验"),),
    "critical": (("批判对象", "权力机制", "利益结构", "文化后果", "替代视角"),),
    "international": (("跨国结构", "叙事主体", "文化编码", "传播效果", "治理命题"),),
    "news_theory": (("基本命题", "专业标准", "制度条件", "现实冲突", "价值判断"),),
    "practice": (("业务任务", "操作步骤", "成品规范", "审核纠错", "多端呈现"), ("工作目标", "素材处理", "结构成型", "质量复核", "发布复盘")),
    "ethics": (("冲突识别", "权利主体", "规范依据", "比例权衡", "责任方案"),),
    "history": (("历史坐标", "形成背景", "发展过程", "影响评价", "比较记忆"),),
    "digital": (("现象界定", "网络结构", "扩散参与", "平台影响", "治理风险"),),
    "technology": (("技术机制", "数据流程", "传播改变", "风险责任", "治理原则"),),
    "fusion": (("融合目标", "组织流程", "产品矩阵", "用户服务", "效果检验"),),
    "advertising": (("广告问题", "受众洞察", "诉求创意", "媒介接触", "效果责任"),),
    "ad_practice": (("市场诊断", "策略定位", "创意转译", "媒介执行", "评估优化"),),
    "public_relations": (("关系问题", "公众地图", "沟通行动", "危机回应", "信任修复"),),
    "management": (("价值产品", "用户市场", "收入成本", "组织能力", "公共责任"),),
    "research": (("问题提出", "概念操作化", "样本资料", "分析检验", "伦理效度"),),
    "frontier": (("前沿现象", "理论连接", "机制证据", "影响争议", "治理回应"),),
    "philosophy": (("原理命题", "辩证关系", "成立条件", "方法论", "材料映射"),),
    "economics": (("范畴定义", "产生条件", "运动过程", "数量关系", "矛盾结果"),),
    "socialism": (("历史问题", "理论依据", "现实力量", "实现条件", "趋势判断"),),
    "political_theory": (("时代课题", "核心回答", "制度安排", "内在联系", "实践要求"),),
    "political_history": (("时间定位", "社会矛盾", "路线行动", "结果原因", "历史启示"),),
    "ethics_politics": (("价值命题", "规范要求", "现实冲突", "行为选择", "养成路径"),),
    "law": (("法律命题", "规范依据", "权利义务", "程序适用", "法治结论"),),
    "current": (("事件定位", "政策理论", "国内国际背景", "中国立场", "现实意义"),),
    "vocab": (("语境词义", "词性搭配", "同义替换", "真题识别", "输出复现"),),
    "grammar": (("结构规则", "识别标志", "句法功能", "语义影响", "改写验证"),),
    "syntax": (("句子主干", "层级边界", "修饰指代", "逻辑关系", "翻译重组"),),
    "reading": (("题型任务", "文本定位", "同义改写", "选项排除", "复盘归因"),),
    "translation": (("结构切分", "词义确定", "逻辑转换", "中文重组", "漏错检查"),),
    "new_question": (("任务识别", "段落中心", "对应线索", "范围校验", "时间分配"),),
    "writing": (("审题对象", "段落功能", "内容展开", "句式衔接", "交卷检查"),),
    "cloze": (("语篇主线", "空格功能", "逻辑关系", "词义搭配", "全文复核"),),
}

def _hash(*parts: str) -> int:
    return int(hashlib.sha1("|".join(parts).encode("utf-8")).hexdigest()[:8], 16)

def _plain(text: str) -> str:
    text = re.sub(r"[#*_`>]", "", text or "")
    text = re.sub(r"\s+", " ", text).strip()
    return text

def _trim(text: str, limit: int) -> str:
    text = _plain(text)
    return text if len(text) <= limit else text[:limit].rstrip("，。；：") + "。"

def _usable_base(text: str) -> bool:
    return len(_plain(text)) >= 180 and not any(x in text for x in GENERIC_MARKERS)

def _profile(chapter_id: str, subject_id: str, chapter_name: str) -> Profile:
    if chapter_id in CHAPTER_PROFILES:
        return CHAPTER_PROFILES[chapter_id]
    if subject_id == "subject_politics":
        return P("political_theory", f"系统掌握{chapter_name}", f"结合材料分析{chapter_name}的现实问题", "准确界定概念与适用条件", ("理论定位", "逻辑关系", "材料对应", "现实要求"))
    if subject_id == "subject_english":
        return P("reading", f"掌握{chapter_name}的真题方法", f"在英语二真题语境中训练{chapter_name}", "答案必须有文本或语言证据", ("规则识别", "证据定位", "选项判断", "复盘输出"))
    return P("theory", f"系统掌握{chapter_name}", f"用新闻传播案例解释{chapter_name}", "说明概念边界和现实条件", ("定义", "机制", "案例", "评价"))

def _core(row: sqlite3.Row, base: str) -> str:
    summary = _plain(row["summary"] or "")
    if summary and not summary.startswith("1. ") and len(summary) <= 190:
        return summary
    text = _plain(base)
    title = _plain(row["title"])
    if text.startswith(title):
        text = text[len(title):].lstrip("：:，。 ")
    return _trim(text or title, 180)

def _labels(profile: Profile, variant: int) -> tuple[str, str, str, str, str]:
    choices = KIND_LABELS.get(profile.kind, KIND_LABELS["theory"])
    return choices[variant % len(choices)]

def _lecture(row: sqlite3.Row, profile: Profile, core: str, base: str, prev_title: str, next_title: str, variant: int) -> str:
    title, chapter = row["title"], row["chapter_name"]
    l1, l2, l3, l4 = profile.lenses
    labels = _labels(profile, variant)
    base_block = base.strip() if _usable_base(base) else f"{title}的核心判断是：{core}"
    p1 = f"“{title}”位于“{chapter}”知识链中。学习它的首要任务是{profile.objective}。核心结论是：{core}"
    p2 = f"围绕{l1}，需要明确它讨论的对象、范围和前提；围绕{l2}，要说明各要素怎样发生联系；围绕{l3}，要追踪条件变化造成的差异；围绕{l4}，要能够提出证据、判断标准或实践结论。"
    p3 = f"把“{title}”放入“{profile.scenario}”这一情境：先找出与“{title}”直接对应的事实，再用“{core}”解释其中的结构或过程，最后判断该解释在哪些条件下成立、会产生什么结果。"
    p4 = f"相邻知识点不能混写。与“{prev_title}”比较时，重点检查研究对象和解释层级；与“{next_title}”比较时，重点检查作用条件和结论方向。本章总边界是：{profile.boundary}"
    p5 = f"完成本知识点后，应能脱离原文完成三种输出：用准确术语复述“{title}”；根据材料识别其运行线索；用本章的{l1}、{l2}、{l3}和{l4}评价其解释力或操作质量。"
    sections = [(labels[0], p1), ("基础讲义", base_block), (labels[1], p2), (labels[2], p3), (labels[3], p4), (labels[4], p5)]
    if variant % 2:
        sections[2], sections[3] = sections[3], sections[2]
    return "\n\n".join(f"【{h}】\n{t}" for h, t in sections)

def _key_points(title: str, profile: Profile, core: str, prev_title: str, next_title: str) -> str:
    a, b, c, d = profile.lenses
    return (
        f"1. 定位：{title}不是孤立名词，其核心结论是“{core}”。\n"
        f"2. {a}：写清讨论对象、适用范围、主体或基本单位，防止概念外延无限扩大。\n"
        f"3. {b}：按“起点—中间过程—结果”还原{title}的内在联系，不能只列特点。\n"
        f"4. {c}：说明哪些条件会强化、削弱或改变结论，形成可用于材料分析的判断标准。\n"
        f"5. {d}：给出证据、评价尺度、实践要求或可观察表现，使答案能够落地。\n"
        f"6. 知识联结：前接“{prev_title}”，后连“{next_title}”；复习时要画出三者的区别与联系。"
    )

def _case(title: str, profile: Profile, core: str, variant: int) -> str:
    prompts = (
        f"案例任务：{profile.scenario}。先摘录3个事实线索，分别对应{profile.lenses[0]}、{profile.lenses[1]}和{profile.lenses[2]}；再用“{core}”解释这些线索，最后依据{profile.lenses[3]}作出评价。",
        f"材料演练：假设题目提供“{profile.scenario}”的材料。第一步判断材料是否真正涉及“{title}”；第二步找出触发条件和关键过程；第三步说明结果及受影响主体；第四步用反例检验结论边界。",
        f"迁移应用：围绕“{profile.scenario}”制作一张分析卡。卡片必须包含：事实、与{title}对应的概念、机制链、可能争议、改进建议。禁止只写空泛价值判断。",
    )
    selected = prompts[variant % len(prompts)]
    return (
        selected
        + f"\n分析落点：必须分别回答“材料中的{profile.lenses[0]}是什么”“{profile.lenses[1]}如何运作”"
        + f"“{profile.lenses[2]}造成什么变化”“{profile.lenses[3]}如何评价”，并逐句标注事实依据。"
        + f"\n复盘要求：再替换一个主体、媒介或时代条件，检验{title}的解释是否仍然成立；若不成立，须用“{profile.boundary}”说明边界，而不是强行套用概念。"
    )

def _mistakes(title: str, profile: Profile, prev_title: str, next_title: str) -> str:
    a, b, c, d = profile.lenses
    return (
        f"1. 把“{title}”写成口号，只重复定义，没有展开{b}和{c}。纠正：至少写出一个条件、一个过程和一个结果。\n"
        f"2. 与“{prev_title}”或“{next_title}”混用。纠正：用“对象—层级—条件—结论”四栏表逐项对照。\n"
        f"3. 材料分析只抄材料，不点明{title}；或只背原理，不引用材料事实。纠正：每个理论句后必须跟一个材料对应句。\n"
        f"4. 忽略本章边界——{profile.boundary}。纠正：答案结尾补充适用范围、局限或例外。\n"
        f"5. 评价只讲好处或坏处。纠正：同时检查{a}、{b}、{c}、{d}，形成有条件的结论。\n"
        f"6. 背过“{title}”就认为已经掌握。纠正：必须能完成定义复述、相邻概念辨析、材料定位和限时输出四项任务，任何一项卡顿都要回到对应薄弱环节重练。"
    )

def _training(title: str, profile: Profile, core: str, prev_title: str, next_title: str, variant: int) -> str:
    kind = profile.kind
    if kind == "model":
        tasks = [f"闭卷画出“{title}”的结构图，标出主体、信息方向、反馈和噪音；再用80字解释每个箭头。", f"把“{profile.scenario}”的事实逐项放入图中，指出模型能解释和不能解释的部分。", f"与“{prev_title}”制作六栏对照表：要素、方向、反馈、环境、优势、局限。", f"限时12分钟回答：为什么“{title}”只是分析工具而不是现实传播的完整复制？"]
    elif kind in {"practice", "ad_practice", "public_relations"}:
        tasks = [f"根据“{profile.scenario}”列出完成{title}所需的素材、对象、时间和风险清单。", f"限时20分钟制作一个可交付成品或操作方案，必须体现{profile.lenses[0]}与{profile.lenses[1]}。", f"按准确、完整、结构、表达、伦理五项各20分自评，并写出至少三处具体修改。", f"将成品改造成另一平台或另一受众版本，说明为什么调整以及调整了什么。"]
    elif kind in {"history", "political_history"}:
        tasks = [f"为“{title}”建立时间卡：背景、节点、主体、主张/行动、结果、影响。", f"把“{title}”放到本章时间线中，向前连接“{prev_title}”，向后连接“{next_title}”。", f"用“历史进步性—现实局限—长期影响”三段式完成180字评价。", f"做一道因果排序题：写出三项原因、两个关键过程和一项直接/深远结果，并检查因果是否倒置。"]
    elif kind == "research":
        tasks = [f"把“{title}”改写成一个明确研究问题，标出研究对象、时间范围和核心概念。", f"设计概念操作化表：定义、维度、指标、资料来源，并说明每个指标为何有效。", f"为“{profile.scenario}”选择样本和方法，写出抽样、采集、分析及伦理步骤。", f"模拟答辩：分别回答效度、信度、代表性、因果解释和研究伦理五个质疑。"]
    elif kind in {"grammar", "syntax"}:
        tasks = [f"从真题找3个涉及“{title}”的句子，划主干、圈连接词、标修饰对象。", f"逐句说明结构为什么成立，再完成直译、调整和最终译文三版输出。", f"把其中一句改写为不同结构，并解释改写后语义重心的变化。", f"整理错误日志：识别错误、边界错误、指代错误、翻译错误各写一例及修正依据。"]
    elif kind in {"reading", "new_question", "cloze"}:
        tasks = [f"限时完成一组与“{title}”对应的真题，记录题干关键词和首个定位点。", f"每题写出“正确证据—同义改写—错误项陷阱”，不得只记录答案字母。", f"对错题进行二次作答：先遮住选项概括原文，再重新判断选项范围。", f"一周后只看错因重新做题，若仍错，判断问题属于词汇、结构、逻辑还是证据意识。"]
    elif kind in {"vocab", "translation", "writing"}:
        action = "写作或翻译" if kind != "vocab" else "阅读和写作"
        tasks = [f"从真题中摘录5个“{title}”相关实例，保留完整句子和上下文。", f"为每个实例标注规则、语义作用、可替换表达和常见误用。", f"完成一次{action}输出，并强制使用其中至少3项；使用后检查是否自然准确。", f"建立48小时复现：不看笔记复述规则、造句或重译，再与原答案逐项比较。"]
    else:
        tasks = [f"闭卷用120字解释“{title}”，必须出现“{_trim(core, 45)}”中的核心关系。", f"制作机制链：前提→主体/对象→关键过程→结果→限制，每一环写一个材料证据。", f"与“{prev_title}”和“{next_title}”完成三点辨析，不得只写名称不同。", f"限时15分钟完成一道材料题或论述段，按概念准确、机制完整、材料结合、边界反思四项自评。"]
    shift = variant % len(tasks)
    tasks = tasks[shift:] + tasks[:shift]
    tasks.append(
        f"完成后进行证据化复盘：把本次输出拆成概念句、机制句、材料句和边界句，"
        f"逐句检查是否真正服务于“{title}”；再依据{profile.lenses[0]}、{profile.lenses[1]}、"
        f"{profile.lenses[2]}、{profile.lenses[3]}各打5分，低于16分时必须改写并保留前后版本，同时写明失分原因、修订依据和下一次复练日期。"
    )
    tasks.append(
        f"安排一次跨情境迁移：48小时后不看笔记，在不同材料或不同题型中再次使用“{title}”，"
        f"并对照第一次答案检查概念准确度、推理完整度和表达速度。若只能复述而不能迁移，说明尚未形成可调用的知识结构。"
    )
    return "\n".join(f"训练{i+1}：{task}" for i, task in enumerate(tasks))

def _self_test(title: str, profile: Profile, prev_title: str, next_title: str, variant: int) -> str:
    qs = [
        f"1. 不看笔记，用两句话准确界定“{title}”，并指出其在“{profile.objective}”中的位置。",
        f"2. “{title}”与“{prev_title}”最容易混淆的地方是什么？请从对象、机制和条件三个方面回答。",
        f"3. 面对“{profile.scenario}”的材料，哪些事实能够证明应使用“{title}”？哪些事实会构成反例？",
        f"4. 如果忽略{profile.lenses[2]}，关于“{title}”的结论为什么可能失效？",
        f"5. 将“{title}”与“{next_title}”组合，设计一道简答题、材料题或真题训练任务，并列出评分点。",
        f"6. 为“{title}”写出一份20分评分细则：概念准确、{profile.lenses[0]}、{profile.lenses[1]}、{profile.lenses[2]}和边界意识各占多少分？再用该细则批改自己的答案。",
    ]
    if variant % 2:
        qs[1], qs[3] = qs[3], qs[1]
    return "\n".join(qs)

def _exam_tips(title: str, profile: Profile, prev_title: str, variant: int) -> str:
    kind = profile.kind
    if kind in {"grammar", "syntax", "vocab", "reading", "translation", "new_question", "writing", "cloze"}:
        mode = "真题识别、证据定位和输出准确性"
        score = f"写清规则或题型任务，给出文本证据，解释为什么正确，并指出一个常见错误项或错误表达"
    elif kind in {"practice", "ad_practice", "public_relations", "research"}:
        mode = "流程题、策划题、实务写作或研究设计"
        score = f"先明确任务和对象，再给出可执行步骤、质量标准、风险控制和复盘指标"
    elif kind in {"history", "political_history"}:
        mode = "时间线选择题、原因意义简答和历史评价"
        score = f"时间定位准确，背景与行动对应，结果和意义分层，并说明历史局限"
    else:
        mode = "名词解释、简答、辨析和材料论述"
        score = f"定义准确，围绕{profile.lenses[0]}与{profile.lenses[1]}展开机制，结合材料，并交代{profile.lenses[2]}和边界"
    return (
        f"“{title}”常见考法是{mode}。得分核心：{score}。若与“{prev_title}”同时出现，要先分清研究对象和解释层级。"
        f"答题时至少使用一个事实或文本证据，结尾依据{profile.lenses[3]}作出有限度的结论；不要堆砌术语，也不要脱离题目写整章笔记。"
        f"\n时间策略：审题时圈出题型动词、限定范围和材料关键词，先用约20%的时间列出{profile.lenses[0]}—{profile.lenses[1]}—{profile.lenses[2]}的得分骨架，"
        f"再完成主体答案，最后预留时间检查概念误用、证据缺失和边界遗漏。"
        f"\n失分复盘：第{variant + 1}轮复习必须把错误归入“不会、混淆、不会用、写不完”之一，并为“{title}”保存一份限时答案和一次针对性改写。"
    )

def _answer_template(title: str, profile: Profile, core: str, variant: int) -> str:
    a, b, c, d = profile.lenses
    openings = ("先直接回应题目", "先完成概念定位", "先提炼材料矛盾", "先明确任务与对象")
    return (
        f"第1段（开题）：{openings[variant % 4]}，准确界定“{title}”，写出核心判断“{_trim(core, 95)}”。\n"
        f"第2段（{a}）：交代讨论对象、背景、主体、范围或前提，避免概念悬空。\n"
        f"第3段（{b}）：按因果链、流程链或结构关系分点展开，每一点都回答“为什么/如何发生”。\n"
        f"第4段（{c}）：把材料事实、真题文本或业务要求逐项对应到前述分析，不得只抄材料。\n"
        f"第5段（比较与边界）：指出相邻概念的区别、成立条件、局限或可能反例。\n"
        f"第6段（{d}）：形成评价、方法论、优化方案或最终答案。全文围绕“{title}”组织，不扩写无关知识。\n"
        f"提交前检查：题干中的每个任务是否都已回应；概念、材料、推理、边界是否各有明确句子；删去不能直接产生得分的套话。"
    )

def _memory(title: str, profile: Profile, core: str, prev_title: str, next_title: str) -> str:
    chain = "—".join(profile.lenses)
    return f"关键词链：{title} → {chain}。一句话锚点：{_trim(core, 70)} 对比记忆：前看“{prev_title}”的对象与起点，后看“{next_title}”的结果与应用。复述时若说不出条件、机制和边界，说明仍停留在识记层。"

def _ensure_columns(conn: sqlite3.Connection) -> None:
    existing = {r[1] for r in conn.execute("PRAGMA table_info(knowledge_points)")}
    for name, ddl in NEW_COLUMNS.items():
        if name not in existing:
            conn.execute(f"ALTER TABLE knowledge_points ADD COLUMN {name} {ddl}")

def _validate(conn: sqlite3.Connection) -> dict:
    fields = ["content", "summary", "key_points", "case_analysis", "common_mistakes", "training_steps", "self_test", "exam_tips", "answer_template", "memory_tips"]
    rows = conn.execute("SELECT * FROM knowledge_points").fetchall()
    minimums = {"content": 520, "summary": 45, "key_points": 220, "case_analysis": 130, "common_mistakes": 260, "training_steps": 300, "self_test": 260, "exam_tips": 220, "answer_template": 280, "memory_tips": 120}
    report = {"total": len(rows), "quality_version": QUALITY_VERSION, "fields": {}, "failures": []}
    for field in fields:
        values = [(r[field] or "").strip() for r in rows]
        report["fields"][field] = {"min_length": min(map(len, values)), "distinct": len(set(values)), "empty": sum(not v for v in values)}
        for r, value in zip(rows, values):
            if len(value) < minimums[field]:
                report["failures"].append(f"{r['id']}:{field}:{len(value)}<{minimums[field]}")
    for marker in GENERIC_MARKERS:
        count = sum(marker in (r["content"] or "") for r in rows)
        if count:
            report["failures"].append(f"generic_marker:{marker}:{count}")
    report["passed"] = not report["failures"] and all(v["distinct"] == len(rows) for v in report["fields"].values())
    return report

def upgrade_all_knowledge(force: bool = False) -> dict:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        _ensure_columns(conn)
        rows = conn.execute(
            "SELECT kp.*, c.name chapter_name, c.description chapter_description FROM knowledge_points kp JOIN chapters c ON c.id=kp.chapter_id ORDER BY kp.subject_id, kp.chapter_id, kp.sort_order, kp.id"
        ).fetchall()
        by_chapter: dict[str, list[sqlite3.Row]] = {}
        for row in rows:
            by_chapter.setdefault(row["chapter_id"], []).append(row)
        upgraded = 0
        conn.execute("BEGIN")
        for chapter_rows in by_chapter.values():
            for index, row in enumerate(chapter_rows):
                if not force and (row["quality_version"] or 0) >= QUALITY_VERSION:
                    continue
                base = (row["base_content"] or row["content"] or "").strip()
                profile = _profile(row["chapter_id"], row["subject_id"], row["chapter_name"])
                core = _core(row, base)
                prev_title = chapter_rows[index - 1]["title"] if index > 0 else chapter_rows[-1]["title"]
                next_title = chapter_rows[index + 1]["title"] if index + 1 < len(chapter_rows) else chapter_rows[0]["title"]
                variant = _hash(row["id"], row["title"]) % 4
                summary = (
                    f"{row['title']}：{_trim(core, 135)}"
                    f"复习时重点把握{profile.lenses[0]}、{profile.lenses[1]}、"
                    f"{profile.lenses[2]}及其适用边界，并能联系{prev_title}与{next_title}完成辨析。"
                )
                values = {
                    "base_content": base,
                    "content": _lecture(row, profile, core, base, prev_title, next_title, variant),
                    "summary": summary,
                    "key_points": _key_points(row["title"], profile, core, prev_title, next_title),
                    "case_analysis": _case(row["title"], profile, core, variant),
                    "common_mistakes": _mistakes(row["title"], profile, prev_title, next_title),
                    "training_steps": _training(row["title"], profile, core, prev_title, next_title, variant),
                    "self_test": _self_test(row["title"], profile, prev_title, next_title, variant),
                    "exam_tips": _exam_tips(row["title"], profile, prev_title, variant),
                    "answer_template": _answer_template(row["title"], profile, core, variant),
                    "memory_tips": _memory(row["title"], profile, core, prev_title, next_title),
                    "source": SOURCE,
                    "quality_version": QUALITY_VERSION,
                }
                conn.execute(
                    "UPDATE knowledge_points SET base_content=:base_content, content=:content, summary=:summary, key_points=:key_points, case_analysis=:case_analysis, common_mistakes=:common_mistakes, training_steps=:training_steps, self_test=:self_test, exam_tips=:exam_tips, answer_template=:answer_template, memory_tips=:memory_tips, source=:source, quality_version=:quality_version, updated_at=datetime('now','localtime') WHERE id=:id",
                    {**values, "id": row["id"]},
                )
                upgraded += 1
        report = _validate(conn)
        report["upgraded"] = upgraded
        if not report["passed"]:
            raise RuntimeError("知识库质量校验未通过：" + "; ".join(report["failures"][:20]))
        conn.commit()
        return report
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()

if __name__ == "__main__":
    import json
    print(json.dumps(upgrade_all_knowledge(force=True), ensure_ascii=False, indent=2))
