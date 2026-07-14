"""
知识库种子脚本 - 从 data/*.md 文件提取知识点，构建结构化知识库
"""
import sqlite3
import json
import uuid
import re
import os
from pathlib import Path

from database import DB_PATH
DATA_DIR = Path(__file__).parent.parent / "data"


def get_db():
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn


def generate_id():
    return str(uuid.uuid4())


def seed_subjects():
    """创建三大学科"""
    db = get_db()

    # 检查是否已有数据
    existing = db.execute("SELECT COUNT(*) FROM subjects").fetchone()[0]
    if existing > 0:
        print("学科已存在，跳过")
        db.close()
        return

    subjects = [
        ("subject_xinchuan", "新传", "334/440", "新闻与传播学", "📰", "#22c55e", 1),
        ("subject_politics", "政治", "101", "思想政治理论", "🏛️", "#ef4444", 2),
        ("subject_english", "英语", "204", "英语二", "🌐", "#3b82f6", 3),
    ]

    for sid, name, code, desc, icon, color, order in subjects:
        db.execute(
            "INSERT INTO subjects (id, name, code, description, icon, color, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (sid, name, code, desc, icon, color, order)
        )

    db.commit()
    db.close()
    print("✅ 三大学科创建完成")


def seed_chapters():
    """创建新传章节结构"""
    db = get_db()

    existing = db.execute("SELECT COUNT(*) FROM chapters").fetchone()[0]
    if existing > 0:
        print("章节已存在，跳过")
        db.close()
        return

    # 新传章节
    xinchuan_chapters = [
        # 传播学
        ("ch_xc_cbs_base", "subject_xinchuan", None, "传播学基础", "传播学基本概念与研究方法", 1, 1),
        ("ch_xc_cbs_type", "subject_xinchuan", None, "传播类型", "自我传播、人际传播、群体传播、组织传播、大众传播", 2, 1),
        ("ch_xc_cbs_model", "subject_xinchuan", None, "传播模式", "拉斯韦尔5W、香农-韦弗、施拉姆等经典传播模式", 3, 1),
        ("ch_xc_cbs_comm", "subject_xinchuan", None, "传播者研究", "把关人理论、媒介组织、新闻专业主义", 4, 1),
        ("ch_xc_cbs_media", "subject_xinchuan", None, "媒介研究", "媒介环境学派、麦克卢汉、媒介融合", 5, 1),
        ("ch_xc_cbs_aud", "subject_xinchuan", None, "受众研究", "使用与满足、受众商品论、编码解码", 6, 1),
        ("ch_xc_cbs_effect", "subject_xinchuan", None, "效果研究", "议程设置、沉默螺旋、培养理论、框架理论、知沟、信息茧房", 7, 1),
        ("ch_xc_cbs_crit", "subject_xinchuan", None, "批判学派", "文化研究、政治经济学、公共领域", 8, 1),
        ("ch_xc_cbs_intl", "subject_xinchuan", None, "国际传播", "信息主权、文化帝国主义、国际传播秩序", 9, 1),
        # 新闻学
        ("ch_xc_xw_base", "subject_xinchuan", None, "新闻基础", "新闻定义、新闻价值、真实性、客观性", 10, 1),
        ("ch_xc_xw_biz", "subject_xinchuan", None, "新闻业务", "采访、写作、编辑、评论", 11, 1),
        ("ch_xc_xw_sys", "subject_xinchuan", None, "新闻体制", "新闻自由、新闻法规、媒体伦理", 12, 1),
        ("ch_xc_xw_hist", "subject_xinchuan", None, "新闻史", "中国新闻传播史、外国新闻传播史", 13, 1),
        # 网络传播
        ("ch_xc_wl_base", "subject_xinchuan", None, "网络传播基础", "互联网传播特征、网络舆论、网络伦理", 14, 1),
        ("ch_xc_wl_newmedia", "subject_xinchuan", None, "新媒体形态", "社交媒体、短视频、直播", 15, 1),
        ("ch_xc_wl_tech", "subject_xinchuan", None, "新媒体技术", "算法推荐、大数据、人工智能", 16, 1),
        ("ch_xc_wl_fusion", "subject_xinchuan", None, "媒体融合", "融媒体、县级融媒体、智慧媒体", 17, 1),
        # 广告公关
        ("ch_xc_ad_base", "subject_xinchuan", None, "广告学基础", "广告定义、功能、发展史", 18, 1),
        ("ch_xc_ad_plan", "subject_xinchuan", None, "广告策划", "创意、文案、媒介", 19, 1),
        ("ch_xc_pr", "subject_xinchuan", None, "公共关系学", "公关定义、职能、危机公关", 20, 1),
        ("ch_xc_mgmt", "subject_xinchuan", None, "媒介经营管理", "媒介市场、盈利模式、管理", 21, 1),
    ]

    # 政治章节
    politics_chapters = [
        ("ch_pol_my_phil", "subject_politics", None, "马克思主义哲学", "唯物论、辩证法、认识论、唯物史观", 1, 1),
        ("ch_pol_my_pe", "subject_politics", None, "马克思主义政治经济学", "劳动价值论、剩余价值论、资本积累", 2, 1),
        ("ch_pol_my_soc", "subject_politics", None, "科学社会主义", "社会主义从空想到科学、共产主义", 3, 1),
        ("ch_pol_mao", "subject_politics", None, "毛泽东思想", "新民主主义革命、社会主义改造", 4, 1),
        ("ch_pol_deng", "subject_politics", None, "邓小平理论", "社会主义本质、改革开放", 5, 1),
        ("ch_pol_xi", "subject_politics", None, "习近平新时代", "新时代矛盾、五位一体、四个全面", 6, 1),
        ("ch_pol_hist_old", "subject_politics", None, "旧民主主义革命", "鸦片战争到辛亥革命", 7, 1),
        ("ch_pol_hist_new", "subject_politics", None, "新民主主义革命", "五四运动到新中国成立", 8, 1),
        ("ch_pol_hist_soc", "subject_politics", None, "社会主义建设", "新中国成立到改革开放", 9, 1),
        ("ch_pol_thought", "subject_politics", None, "思想道德修养", "人生观、理想信念、核心价值观", 10, 1),
        ("ch_pol_law", "subject_politics", None, "法治素养", "法律体系、法治思维", 11, 1),
    ]

    # 英语章节
    english_chapters = [
        ("ch_eng_vocab", "subject_english", None, "词汇", "高频核心词汇、词组、同义替换", 1, 1),
        ("ch_eng_grammar", "subject_english", None, "语法", "句子结构、从句、非谓语、时态", 2, 1),
        ("ch_eng_long", "subject_english", None, "长难句", "长难句拆解方法、真题精选", 3, 1),
        ("ch_eng_read", "subject_english", None, "阅读", "阅读技巧、真题精讲", 4, 1),
        ("ch_eng_trans", "subject_english", None, "翻译", "翻译技巧、真题翻译", 5, 1),
        ("ch_eng_new", "subject_english", None, "新题型", "七选五、排序题、标题匹配", 6, 1),
        ("ch_eng_write", "subject_english", None, "作文", "小作文模板、大作文模板、高分句型", 7, 1),
    ]

    all_chapters = xinchuan_chapters + politics_chapters + english_chapters

    for cid, sid, pid, name, desc, order, level in all_chapters:
        db.execute(
            "INSERT INTO chapters (id, subject_id, parent_id, name, description, sort_order, level) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (cid, sid, pid, name, desc, order, level)
        )

    db.commit()
    db.close()
    print(f"✅ 章节创建完成：新传 {len(xinchuan_chapters)} 个，政治 {len(politics_chapters)} 个，英语 {len(english_chapters)} 个")


def parse_markdown_to_knowledge(filepath, subject_id, chapter_mapping):
    """从 Markdown 文件解析知识点"""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    filename = os.path.basename(filepath)
    points = []

    # 按 ## 分割为知识点
    sections = re.split(r'\n## ', content)

    current_chapter = None
    for i, section in enumerate(sections):
        if i == 0:
            # 第一个 section 是文件头
            continue

        lines = section.strip().split('\n')
        if not lines:
            continue

        title = lines[0].strip().replace('#', '').strip()
        body = '\n'.join(lines[1:]).strip()

        if not title or len(body) < 20:
            continue

        # 根据标题判断所属章节
        chapter_id = None
        for pattern, ch_id in chapter_mapping.items():
            if pattern in title or pattern in filename:
                chapter_id = ch_id
                break

        if not chapter_id:
            # 默认使用文件名匹配
            for pattern, ch_id in chapter_mapping.items():
                if pattern in filename:
                    chapter_id = ch_id
                    break

        if not chapter_id:
            continue

        # 判断重要性
        importance = "medium"
        if any(kw in body for kw in ["高频", "重点", "必背", "常考", "核心"]):
            importance = "high"
        elif any(kw in body for kw in ["了解", "补充", "扩展"]):
            importance = "low"

        # 判断层级
        level = 1
        if i > 3:
            level = 2
        if i > 6:
            level = 3

        # 提取标签
        tags = []
        tag_patterns = ["传播学", "新闻学", "效果研究", "受众", "媒介", "理论", "概念", "实务"]
        for tp in tag_patterns:
            if tp in title or tp in body[:200]:
                tags.append(tp)

        points.append({
            "id": generate_id(),
            "subject_id": subject_id,
            "chapter_id": chapter_id,
            "title": title,
            "content": body[:5000],  # 限制内容长度
            "importance": importance,
            "frequency": "medium",
            "level": level,
            "tags": tags,
            "sort_order": i,
        })

    return points


def seed_knowledge_points():
    """从 data/*.md 文件提取知识点"""
    db = get_db()

    existing = db.execute("SELECT COUNT(*) FROM knowledge_points").fetchone()[0]
    if existing > 0:
        print(f"知识点已存在 ({existing} 个)，跳过")
        db.close()
        return

    # 文件→章节映射
    file_chapter_map = {
        "传播学教程_完整知识点.md": {
            "传播": "ch_xc_cbs_base",
            "类型": "ch_xc_cbs_type",
            "模式": "ch_xc_cbs_model",
            "把关": "ch_xc_cbs_comm",
            "媒介": "ch_xc_cbs_media",
            "受众": "ch_xc_cbs_aud",
            "效果": "ch_xc_cbs_effect",
            "议程": "ch_xc_cbs_effect",
            "沉默": "ch_xc_cbs_effect",
            "培养": "ch_xc_cbs_effect",
            "框架": "ch_xc_cbs_effect",
            "知沟": "ch_xc_cbs_effect",
            "茧房": "ch_xc_cbs_effect",
            "批判": "ch_xc_cbs_crit",
            "文化研究": "ch_xc_cbs_crit",
            "公共领域": "ch_xc_cbs_crit",
            "国际": "ch_xc_cbs_intl",
        },
        "新闻学概论_完整知识点.md": {
            "新闻": "ch_xc_xw_base",
            "价值": "ch_xc_xw_base",
            "真实": "ch_xc_xw_base",
            "客观": "ch_xc_xw_base",
            "采访": "ch_xc_xw_biz",
            "写作": "ch_xc_xw_biz",
            "编辑": "ch_xc_xw_biz",
            "评论": "ch_xc_xw_biz",
            "自由": "ch_xc_xw_sys",
            "法规": "ch_xc_xw_sys",
            "伦理": "ch_xc_xw_sys",
        },
        "新闻采访与写作_完整知识点.md": {"采访": "ch_xc_xw_biz", "写作": "ch_xc_xw_biz"},
        "新闻编辑学_完整知识点.md": {"编辑": "ch_xc_xw_biz"},
        "新闻评论_完整知识点.md": {"评论": "ch_xc_xw_biz"},
        "网络传播与新媒体_完整知识点.md": {
            "网络": "ch_xc_wl_base",
            "新媒体": "ch_xc_wl_newmedia",
            "社交": "ch_xc_wl_newmedia",
            "短视频": "ch_xc_wl_newmedia",
            "算法": "ch_xc_wl_tech",
            "融合": "ch_xc_wl_fusion",
        },
        "新媒体热点专题_完整知识点.md": {
            "热点": "ch_xc_wl_newmedia",
            "AIGC": "ch_xc_wl_tech",
            "算法": "ch_xc_wl_tech",
            "融合": "ch_xc_wl_fusion",
        },
        "广告学概论_完整知识点.md": {"广告": "ch_xc_ad_base", "创意": "ch_xc_ad_plan"},
        "公共关系学_完整知识点.md": {"公关": "ch_xc_pr", "危机": "ch_xc_pr"},
        "中国新闻传播史_完整知识点.md": {"中国": "ch_xc_xw_hist"},
        "外国新闻传播史_完整知识点.md": {"外国": "ch_xc_xw_hist"},
        "传播学笔记_merged_1_AI整理.md": {"传播": "ch_xc_cbs_base"},
        "新媒体热点专题_完整知识点_AI整理.md": {"热点": "ch_xc_wl_newmedia"},
    }

    total_points = 0

    for filename, chapter_mapping in file_chapter_map.items():
        filepath = DATA_DIR / filename
        if not filepath.exists():
            print(f"⚠️ 文件不存在: {filename}")
            continue

        points = parse_markdown_to_knowledge(filepath, "subject_xinchuan", chapter_mapping)

        for p in points:
            db.execute(
                "INSERT INTO knowledge_points (id, subject_id, chapter_id, title, content, importance, frequency, level, tags, sort_order) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                (p["id"], p["subject_id"], p["chapter_id"], p["title"], p["content"],
                 p["importance"], p["frequency"], p["level"],
                 json.dumps(p["tags"]), p["sort_order"])
            )

        total_points += len(points)
        print(f"  ✅ {filename}: {len(points)} 个知识点")

    db.commit()
    db.close()
    print(f"✅ 知识点提取完成：共 {total_points} 个")


def seed_politics_knowledge():
    """创建政治知识库（基础框架）"""
    db = get_db()

    existing = db.execute("SELECT COUNT(*) FROM knowledge_points WHERE subject_id = 'subject_politics'").fetchone()[0]
    if existing > 0:
        print(f"政治知识点已存在 ({existing} 个)，跳过")
        db.close()
        return

    # 马克思主义哲学 - 唯物论
    my_phil_points = [
        ("物质与意识的辩证关系", "物质决定意识，意识对物质有能动的反作用。\n\n1. **物质决定意识**：物质是不依赖于人的意识并能为人的意识所反映的客观实在。意识是物质世界长期发展的产物，是人脑的机能，是物质的反映。\n\n2. **意识的能动作用**：意识能够能动地认识世界和改造世界。正确的意识促进事物发展，错误的意识阻碍事物发展。\n\n3. **方法论意义**：一切从实际出发，实事求是；同时要重视意识的作用，树立正确的意识。", "high", "唯物论", "物质决定意识，意识反作用于物质"),
        ("物质的存在方式", "运动是物质的根本属性和存在方式。\n\n1. **物质与运动不可分**：运动是物质的运动，物质是运动的物质。设想不运动的物质是形而上学，设想无物质的运动是唯心主义。\n\n2. **运动与静止的辩证关系**：运动是绝对的、无条件的、永恒的；静止是相对的、有条件的、暂时的。静止是运动的特殊状态。\n\n3. **方法论意义**：既要看到运动的绝对性，又要承认相对静止的存在。", "medium", "唯物论", "运动是物质的根本属性"),
        ("意识的能动作用", "意识的能动作用主要表现在：\n\n1. **认识世界**：意识能够能动地反映世界，不仅能反映事物的现象，而且能反映事物的本质和规律。\n\n2. **改造世界**：意识能通过实践能动地改造世界。\n\n3. **调控人体**：意识能调节和控制人体的生理活动。\n\n**条件**：意识的能动作用必须通过实践来实现，必须遵循客观规律。", "medium", "唯物论", "意识通过实践改造世界"),
    ]

    # 马克思主义哲学 - 辩证法
    bianzheng_points = [
        ("对立统一规律", "对立统一规律是唯物辩证法的实质和核心。\n\n1. **矛盾的同一性和斗争性**：同一性是相对的、有条件的；斗争性是绝对的、无条件的。两者相互依存、相互制约。\n\n2. **矛盾的普遍性和特殊性**：普遍性寓于特殊性之中，特殊性包含普遍性。两者在一定条件下相互转化。\n\n3. **主要矛盾和次要矛盾**：主要矛盾处于支配地位，起决定作用。要善于抓主要矛盾，同时不忽视次要矛盾。\n\n4. **方法论意义**：坚持两点论和重点论的统一。", "high", "辩证法", "对立统一是辩证法核心"),
        ("质量互变规律", "量变和质变是事物发展的两种状态。\n\n1. **量变**：事物数量的增减和场所的变更，是渐进的、不显著的变化。\n\n2. **质变**：事物根本性质的变化，是渐进过程的中断。\n\n3. **辩证关系**：量变是质变的必要准备，质变是量变的必然结果；质变又引起新的量变。\n\n4. **方法论意义**：重视量的积累；抓住时机促成质变；坚持适度原则。", "high", "辩证法", "量变引起质变"),
        ("否定之否定规律", "事物的发展经历肯定→否定→否定之否定的过程。\n\n1. **辩证否定观**：否定是事物的自我否定，是联系和发展的环节，其实质是扬弃。\n\n2. **否定之否定**：事物发展的总趋势是前进的、上升的，道路是曲折的、迂回的。\n\n3. **方法论意义**：对事物要采取科学分析的态度，反对肯定一切或否定一切。", "high", "辩证法", "否定之否定：前进性与曲折性统一"),
        ("联系与发展", "联系和发展是唯物辩证法的总特征。\n\n1. **联系的特点**：客观性、普遍性、多样性、条件性。\n\n2. **发展的实质**：新事物的产生和旧事物的灭亡。\n\n3. **方法论意义**：用联系和发展的观点看问题，反对孤立、静止的观点。", "medium", "辩证法", "联系和发展是辩证法总特征"),
    ]

    # 马克思主义哲学 - 认识论
    renshi_points = [
        ("实践与认识的辩证关系", "实践是认识的基础，对认识有决定作用。\n\n1. **实践是认识的来源**：认识产生于实践的需要，认识在实践中产生。\n\n2. **实践是认识发展的动力**：实践不断提出新问题，推动认识发展。\n\n3. **实践是检验真理的唯一标准**：只有实践才能检验认识是否正确。\n\n4. **实践是认识的目的**：认识的最终目的是指导实践。\n\n5. **认识对实践的反作用**：正确的认识指导实践取得成功，错误的认识导致实践失败。", "high", "认识论", "实践是认识的基础"),
        ("真理", "真理是客观的、具体的、有条件的。\n\n1. **真理的客观性**：真理的内容是客观的，不以人的意志为转移。\n\n2. **真理的具体性**：任何真理都是相对于特定过程来说的，是主观与客观、理论与实践的具体的历史的统一。\n\n3. **真理的条件性**：任何真理都有自己适用的条件和范围。\n\n4. **真理与谬误**：真理和谬误相比较而存在，相斗争而发展。在一定条件下相互转化。", "high", "认识论", "真理是客观的、具体的、有条件的"),
    ]

    # 毛中特
    mao_points = [
        ("新民主主义革命理论", "新民主主义革命是无产阶级领导的，人民大众的，反对帝国主义、封建主义和官僚资本主义的革命。\n\n1. **革命对象**：帝国主义、封建主义、官僚资本主义\n2. **革命动力**：工人阶级、农民阶级、城市小资产阶级、民族资产阶级\n3. **革命领导**：无产阶级（通过共产党）\n4. **革命性质**：新式的特殊的资产阶级民主革命\n5. **革命前途**：社会主义", "high", "毛泽东思想", "新民主主义革命：无产阶级领导的资产阶级民主革命"),
        ("社会主义改造理论", "从新民主主义到社会主义的过渡时期，对农业、手工业和资本主义工商业进行社会主义改造。\n\n1. **农业**：互助组→初级社→高级社\n2. **手工业**：供销合作小组→供销合作社→生产合作社\n3. **资本主义工商业**：国家资本主义（加工订货→公私合营→全行业公私合营）\n\n**意义**：确立了社会主义基本制度，实现了中国历史上最深刻最伟大的社会变革。", "high", "毛泽东思想", "三大改造：农业、手工业、资本主义工商业"),
    ]

    # 习近平新时代
    xi_points = [
        ("新时代社会主要矛盾", "中国特色社会主义进入新时代，我国社会主要矛盾已经转化为人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。\n\n1. **美好生活需要**：不仅包括物质文化需要，还包括民主、法治、公平、正义、安全、环境等方面的需要。\n\n2. **不平衡不充分**：发展不平衡主要指各区域各领域各方面发展不够平衡；发展不充分主要指一些地区、一些领域、一些方面还存在发展不足的问题。\n\n3. **两个没有变**：我国仍处于并将长期处于社会主义初级阶段的基本国情没有变，我国是世界最大发展中国家的国际地位没有变。", "high", "习近平新时代", "主要矛盾：美好生活需要 vs 不平衡不充分"),
        ('"五位一体"总体布局', "经济建设、政治建设、文化建设、社会建设、生态文明建设五位一体。\n\n1. **经济建设**：贯彻新发展理念，建设现代化经济体系\n2. **政治建设**：健全人民当家作主制度体系\n3. **文化建设**：坚定文化自信，推动社会主义文化繁荣兴盛\n4. **社会建设**：提高保障和改善民生水平\n5. **生态文明建设**：加快生态文明体制改革\n\n**意义**：体现了中国特色社会主义事业的全面性和系统性。", "high", "习近平新时代", "五位一体：经济、政治、文化、社会、生态"),
        ('"四个全面"战略布局', "全面建设社会主义现代化国家、全面深化改革、全面依法治国、全面从严治党。\n\n1. **全面建设社会主义现代化国家**：战略目标\n2. **全面深化改革**：根本动力\n3. **全面依法治国**：重要保障\n4. **全面从严治党**：关键举措\n\n**关系**：四个全面相辅相成、相互促进、相得益彰。", "high", "习近平新时代", "四个全面：现代化、改革、法治、治党"),
    ]

    # 史纲
    hist_points = [
        ("五四运动", "1919年5月4日爆发的五四运动是一场彻底的反帝反封建的爱国运动。\n\n1. **导火索**：巴黎和会上中国外交的失败\n2. **口号**：\"外争主权，内除国贼\"\n3. **意义**：\n   - 是中国新民主主义革命的开端\n   - 促进了马克思主义在中国的传播\n   - 促进了马克思主义同中国工人运动的结合\n   - 为中国共产党的成立做了思想上和干部上的准备", "high", "新民主主义革命", "五四运动：新民主主义革命开端"),
        ("抗日战争", "1937-1945年，中国人民进行了伟大的抗日战争。\n\n1. **全面抗战路线**：中国共产党提出全面抗战路线，实行人民战争\n2. **持久战方针**：毛泽东《论持久战》提出持久战的战略方针\n3. **三个阶段**：战略防御→战略相持→战略反攻\n4. **意义**：\n   - 是近代以来中国抗击外敌入侵的第一次完全胜利\n   - 为世界反法西斯战争作出了重大贡献\n   - 提高了中国的国际地位", "high", "新民主主义革命", "抗日战争：近代首次完全胜利"),
    ]

    # 思修法基
    thought_points = [
        ("社会主义核心价值观", "富强、民主、文明、和谐（国家层面）；自由、平等、公正、法治（社会层面）；爱国、敬业、诚信、友善（个人层面）。\n\n1. **国家层面**：富强、民主、文明、和谐——回答了建设什么样的国家的问题\n2. **社会层面**：自由、平等、公正、法治——回答了建设什么样的社会的问题\n3. **个人层面**：爱国、敬业、诚信、友善——回答了培育什么样的公民的问题\n\n**意义**：是当代中国精神的集中体现，凝结着全体人民共同的价值追求。", "high", "思想道德修养", "核心价值观：国家、社会、个人三个层面"),
    ]

    all_points = (
        [(p, "ch_pol_my_phil") for p in my_phil_points] +
        [(p, "ch_pol_my_phil") for p in bianzheng_points] +
        [(p, "ch_pol_my_phil") for p in renshi_points] +
        [(p, "ch_pol_mao") for p in mao_points] +
        [(p, "ch_pol_xi") for p in xi_points] +
        [(p, "ch_pol_hist_new") for p in hist_points] +
        [(p, "ch_pol_thought") for p in thought_points]
    )

    count = 0
    for (title, content, importance, tags_str, exam_tips), chapter_id in all_points:
        tags = [t.strip() for t in tags_str.split("、")] if "、" in tags_str else [tags_str]
        db.execute(
            "INSERT INTO knowledge_points (id, subject_id, chapter_id, title, content, importance, frequency, level, tags, exam_tips, sort_order) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (generate_id(), "subject_politics", chapter_id, title, content, importance, "high", 1,
             json.dumps(tags), exam_tips, count)
        )
        count += 1

    db.commit()
    db.close()
    print(f"✅ 政治知识点创建完成：{count} 个")


def seed_english_knowledge():
    """创建英语知识库（基础框架）"""
    db = get_db()

    existing = db.execute("SELECT COUNT(*) FROM knowledge_points WHERE subject_id = 'subject_english'").fetchone()[0]
    if existing > 0:
        print(f"英语知识点已存在 ({existing} 个)，跳过")
        db.close()
        return

    grammar_points = [
        ("五大基本句型", "英语句子由五种基本句型构成：\n\n1. **主语+谓语（S+V）**：Birds fly.\n2. **主语+谓语+宾语（S+V+O）**：I love English.\n3. **主语+谓语+间接宾语+直接宾语（S+V+IO+DO）**：He gave me a book.\n4. **主语+谓语+宾语+宾补（S+V+O+C）**：We elected him president.\n5. **主语+系动词+表语（S+V+P）**：She is beautiful.\n\n**常考系动词**：be, become, seem, appear, look, sound, smell, taste, feel, remain, stay, turn, go, get, grow, come, prove, keep", "high", "语法", "五大句型是长难句分析的基础"),
        ("定语从句", "定语从句在句中作定语，修饰名词或代词。\n\n1. **关系代词**：who, whom, whose, which, that\n   - who/whom 指人\n   - which 指物\n   - that 既可指人也可指物\n   - whose 表示所属关系\n\n2. **关系副词**：when, where, why\n   - when 表示时间\n   - where 表示地点\n   - why 表示原因\n\n3. **限制性 vs 非限制性**：\n   - 限制性：不用逗号，不可省略\n   - 非限制性：用逗号隔开，可省略\n\n**考研重点**：that 与 which 的区别、as 引导的定语从句", "high", "语法", "定语从句是长难句核心"),
        ("名词性从句", "名词性从句在句中起名词作用，包括主语从句、宾语从句、表语从句、同位语从句。\n\n1. **主语从句**：That he passed the exam surprised us.\n2. **宾语从句**：I believe that he is honest.\n3. **表语从句**：The problem is that we lack money.\n4. **同位语从句**：The news that he won is true.\n\n**关键区别**：同位语从句 vs 定语从句——同位语从句解释名词内容，定语从句修饰限定名词。", "high", "语法", "四种名词性从句及其区别"),
        ("非谓语动词", "非谓语动词包括不定式、动名词和分词。\n\n1. **不定式（to do）**：\n   - 作主语：To learn English is important.\n   - 作宾语：I want to go.\n   - 作定语：I have something to tell you.\n   - 作状语：He came to see me.\n\n2. **动名词（doing）**：\n   - 作主语：Swimming is good exercise.\n   - 作宾语：I enjoy reading.\n\n3. **分词**：\n   - 现在分词（doing）：表主动、进行\n   - 过去分词（done）：表被动、完成\n\n**考研重点**：不定式 vs 动名词的区别、独立主格结构", "high", "语法", "非谓语动词是翻译和完形重点"),
    ]

    read_points = [
        ("主旨题解题技巧", "主旨题考查文章的中心思想或主要论点。\n\n**标志词**：main idea, mainly about, best title, purpose\n\n**解题步骤**：\n1. 首先看文章首段和末段\n2. 注意各段首句（主题句）\n3. 寻找反复出现的关键词\n4. 排除过于宽泛或过于狭窄的选项\n\n**常见干扰项**：\n- 以偏概全（只涉及部分内容）\n- 过于宽泛（超出文章范围）\n- 偷换概念（似是而非）", "high", "阅读", "主旨题：看首末段和各段首句"),
        ("态度题解题技巧", "态度题考查作者对某事物的态度或观点。\n\n**常见态度词**：\n- 正面：positive, supportive, optimistic, approving\n- 负面：negative, critical, pessimistic, disapproving\n- 中立：neutral, objective, impartial, ambiguous\n\n**解题步骤**：\n1. 定位态度相关段落\n2. 找到态度词（形容词、副词、转折词）\n3. 注意双重否定和委婉表达\n4. 排除过于绝对的选项\n\n**注意**：作者态度往往在转折词（but, however, yet）之后", "high", "阅读", "态度题：找转折词后的态度词"),
    ]

    write_points = [
        ("小作文书信模板", "书信类小作文模板：\n\n**开头段**：\nI am writing to + 目的（express my gratitude / make a complaint / apply for...）\n\n**中间段**：\nFirst and foremost, ... Furthermore, ... Last but not least, ...\n\n**结尾段**：\nI would appreciate it if you could ... I am looking forward to your reply.\n\n**常用句型**：\n- I am writing to express my sincere gratitude for...\n- I am writing to make a complaint about...\n- I am writing to apply for the position of...\n- I would be grateful if you could...", "high", "作文", "书信开头：I am writing to..."),
        ("大作文图表描述模板", "大作文图表描述模板：\n\n**第一段：描述图表**\nAs is vividly depicted in the chart/graph/picture, ... The most striking feature is that ...\n\n**第二段：分析原因**\nThe reasons for this phenomenon can be listed as follows. First and foremost, ... Furthermore, ... Last but not least, ...\n\n**第三段：总结建议**\nTaking all these factors into consideration, we may safely predict that ...\n\n**常用句型**：\n- As is shown/indicated/illustrated in the chart...\n- The number/percentage of ... increased/decreased from ... to ...\n- There is a dramatic/significant/slight increase/decrease in...", "high", "作文", "图表作文：描述→分析→总结"),
    ]

    vocab_points = [
        ("高频核心词组", "考研英语高频词组：\n\n**动词词组**：\n- account for：解释，占比例\n- turn out：结果是\n- bring about：引起，导致\n- carry out：执行\n- come up with：提出\n- make up for：弥补\n- put forward：提出\n- take into account：考虑到\n\n**介词词组**：\n- in terms of：就...而言\n- in the light of：根据\n- by virtue of：由于\n- on behalf of：代表\n- in contrast to：与...形成对比\n- with regard to：关于\n\n**考研重点**：一词多义、熟词僻义", "high", "词汇", "词组是完形和阅读的高频考点"),
    ]

    all_points = (
        [(p, "ch_eng_grammar") for p in grammar_points] +
        [(p, "ch_eng_read") for p in read_points] +
        [(p, "ch_eng_write") for p in write_points] +
        [(p, "ch_eng_vocab") for p in vocab_points]
    )

    count = 0
    for (title, content, importance, tags_str, exam_tips), chapter_id in all_points:
        tags = [t.strip() for t in tags_str.split("、")] if "、" in tags_str else [tags_str]
        db.execute(
            "INSERT INTO knowledge_points (id, subject_id, chapter_id, title, content, importance, frequency, level, tags, exam_tips, sort_order) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (generate_id(), "subject_english", chapter_id, title, content, importance, "high", 1,
             json.dumps(tags), exam_tips, count)
        )
        count += 1

    db.commit()
    db.close()
    print(f"✅ 英语知识点创建完成：{count} 个")


def seed_knowledge_relations():
    """创建知识点关系"""
    db = get_db()

    existing = db.execute("SELECT COUNT(*) FROM knowledge_relations").fetchone()[0]
    if existing > 0:
        print(f"知识关系已存在 ({existing} 条)，跳过")
        db.close()
        return

    # 获取所有新传知识点
    all_xc_points = db.execute(
        "SELECT id, title FROM knowledge_points WHERE subject_id = 'subject_xinchuan'"
    ).fetchall()

    # 建立标题→ID映射（支持模糊匹配）
    title_to_id = {}
    for p in all_xc_points:
        title_to_id[p["title"]] = p["id"]

    def find_point_id(keyword):
        """通过关键词查找知识点ID（模糊匹配）"""
        # 优先精确匹配
        for p in all_xc_points:
            if keyword == p["title"]:
                return p["id"]
        # 模糊匹配
        for p in all_xc_points:
            if keyword in p["title"]:
                return p["id"]
        return None

    relations = []

    # 经典理论对比关系（使用模糊匹配）
    contrasts = [
        ("议程设置", "框架", "议程设置告诉人们'想什么'，框架理论告诉人们'怎么想'"),
        ("议程设置", "沉默的螺旋", "两者都是大众传播效果理论，但关注点不同"),
        ("使用与满足", "议程设置", "前者强调受众主动性，后者强调媒体影响力"),
        ("培养理论", "信息茧房", "两者都关注媒体对受众认知的长期影响"),
        ("知沟", "信息茧房", "两者都关注信息传播中的不平等问题"),
        ("把关人", "议程设置", "把关人决定信息流通，议程设置影响议题显著性"),
        ("沉默的螺旋", "群体极化", "两者都关注舆论形成过程中的社会心理机制"),
        ("框架", "刻板印象", "框架理论与刻板印象都涉及信息的选择性呈现"),
        ("编码", "解码", "霍尔的编码解码理论：传播者编码，受众解码"),
        ("议程设置", "意见领袖", "议程设置与意见领袖在信息传播中的协同作用"),
        ("媒介融合", "全媒体", "媒介融合是实现全媒体传播的路径"),
        ("新闻价值", "新闻专业主义", "新闻价值判断是新闻专业主义的核心实践"),
        ("新闻真实", "新闻客观", "新闻真实与新闻客观是新闻专业主义的两大基石"),
        ("第三人效果", "沉默的螺旋", "两者都涉及公众对舆论的感知与实际舆论的偏差"),
        ("使用与满足", "受众", "使用与满足理论是受众研究的核心理论"),
        ("文化帝国主义", "国际传播", "文化帝国主义是国际传播不平等的表现"),
        ("公共领域", "舆论", "公共领域是舆论形成的重要空间"),
        ("把关人", "新闻编辑", "把关人理论是新闻编辑实践的理论基础"),
        ("媒介融合", "县级融媒体", "县级融媒体是媒介融合在基层的实践"),
        ("广告", "公共关系", "广告与公关都是组织传播的重要手段"),
        ("新闻采访", "新闻写作", "采访是写作的基础，写作是采访的呈现"),
        ("新闻编辑", "新闻评论", "编辑和评论都是新闻生产的重要环节"),
        ("唯物论", "辩证法", "唯物论回答世界是什么，辩证法回答世界怎么样"),
        ("辩证法", "认识论", "辩证法是认识论的基础，认识论是辩证法的应用"),
        ("量变", "质变", "量变是质变的必要准备，质变是量变的必然结果"),
        ("实践", "认识", "实践是认识的来源和检验标准，认识指导实践"),
        ("毛泽东思想", "邓小平理论", "邓小平理论是毛泽东思想的继承和发展"),
        ("社会主义", "共产主义", "社会主义是共产主义的初级阶段"),
    ]

    for t1, t2, desc in contrasts:
        id1 = find_point_id(t1)
        id2 = find_point_id(t2)
        if id1 and id2 and id1 != id2:
            relations.append({
                "source_id": id1,
                "target_id": id2,
                "relation_type": "contrast",
                "description": desc,
                "weight": 0.9,
            })

    # 发展关系
    evolutions = [
        ("议程设置", "属性议程设置", "从议题显著性发展到属性显著性"),
        ("知沟", "数字鸿沟", "从传统媒体时代的知沟发展到数字时代的鸿沟"),
        ("媒介融合", "融媒体", "从媒介融合理念发展到融媒体实践"),
        ("议程设置", "网络议程设置", "从传统媒体议程设置发展到网络议程设置"),
        ("拉斯韦尔", "传播模式", "拉斯韦尔5W模式是传播模式研究的开端"),
        ("香农", "信息论", "香农-韦弗模式奠定了信息论基础"),
        ("麦克卢汉", "媒介环境学派", "麦克卢汉是媒介环境学派的奠基人"),
        ("新媒体", "算法推荐", "新媒体技术发展催生了算法推荐"),
        ("社交媒体", "网络舆论", "社交媒体成为网络舆论的主要阵地"),
        ("传统媒体", "新媒体", "从传统媒体到新媒体的转型"),
    ]

    for t1, t2, desc in evolutions:
        id1 = find_point_id(t1)
        id2 = find_point_id(t2)
        if id1 and id2 and id1 != id2:
            relations.append({
                "source_id": id1,
                "target_id": id2,
                "relation_type": "evolution",
                "description": desc,
                "weight": 1.0,
            })

    # 前置关系
    prerequisites = [
        ("传播", "大众传播", "理解大众传播需要先理解传播的基本概念"),
        ("新闻价值", "新闻", "新闻价值是新闻报道的核心标准"),
        ("传播模式", "效果研究", "理解传播模式是研究传播效果的基础"),
        ("唯物论", "辩证法", "唯物论是辩证法的理论基础"),
        ("辩证法", "认识论", "辩证法为认识论提供方法论指导"),
        ("实践", "真理", "实践是检验真理的唯一标准"),
        ("劳动价值论", "剩余价值论", "劳动价值论是剩余价值论的基础"),
    ]

    for t1, t2, desc in prerequisites:
        id1 = find_point_id(t1)
        id2 = find_point_id(t2)
        if id1 and id2 and id1 != id2:
            relations.append({
                "source_id": id1,
                "target_id": id2,
                "relation_type": "prerequisite",
                "description": desc,
                "weight": 1.0,
            })

    # 包含关系
    includes = [
        ("传播学", "效果研究", "效果研究是传播学的重要分支"),
        ("传播学", "受众研究", "受众研究是传播学的重要组成部分"),
        ("传播学", "媒介研究", "媒介研究是传播学的核心领域"),
        ("新闻学", "新闻业务", "新闻业务是新闻学的实践层面"),
        ("新闻学", "新闻史", "新闻史是新闻学的历史维度"),
        ("新媒体", "社交媒体", "社交媒体是新媒体的重要形态"),
        ("新媒体", "短视频", "短视频是新媒体的主流形式"),
        ("马克思主义哲学", "唯物论", "唯物论是马克思主义哲学的基础"),
        ("马克思主义哲学", "辩证法", "辩证法是马克思主义哲学的核心"),
        ("马克思主义哲学", "认识论", "认识论是马克思主义哲学的重要组成"),
    ]

    for t1, t2, desc in includes:
        id1 = find_point_id(t1)
        id2 = find_point_id(t2)
        if id1 and id2 and id1 != id2:
            relations.append({
                "source_id": id1,
                "target_id": id2,
                "relation_type": "includes",
                "description": desc,
                "weight": 1.0,
            })

    # 相关关系（同一章节的知识点）
    effect_points = db.execute(
        "SELECT id, title FROM knowledge_points WHERE chapter_id = 'ch_xc_cbs_effect'"
    ).fetchall()

    for i, p1 in enumerate(effect_points):
        for j, p2 in enumerate(effect_points):
            if i < j:
                relations.append({
                    "source_id": p1["id"],
                    "target_id": p2["id"],
                    "relation_type": "related",
                    "description": f"{p1['title']}与{p2['title']}同属传播学效果研究",
                    "weight": 0.7,
                })

    count = 0
    for r in relations:
        db.execute(
            "INSERT INTO knowledge_relations (id, source_id, target_id, relation_type, description, weight) VALUES (?, ?, ?, ?, ?, ?)",
            (generate_id(), r["source_id"], r["target_id"], r["relation_type"], r["description"], r["weight"])
        )
        count += 1

    db.commit()
    db.close()
    print(f"✅ 知识关系创建完成：{count} 条")


def seed_exam_questions():
    """创建真题数据"""
    db = get_db()

    existing = db.execute("SELECT COUNT(*) FROM exam_questions").fetchone()[0]
    if existing > 0:
        print(f"真题已存在 ({existing} 道)，跳过")
        db.close()
        return

    # 获取知识点ID
    def get_kp_id(title_keyword):
        row = db.execute(
            "SELECT id FROM knowledge_points WHERE title LIKE ? LIMIT 1",
            (f"%{title_keyword}%",)
        ).fetchone()
        return row["id"] if row else None

    questions = [
        # 议程设置
        {
            "kp_id": get_kp_id("议程设置"),
            "subject": "440",
            "year": 2024,
            "school": "深圳大学",
            "type": "short_answer",
            "content": "简述议程设置理论的三个层次及其新媒体环境下的发展",
            "answer": "议程设置理论的三个层次：\n\n1. **第一层次：议题显著性**（1972年，麦库姆斯和肖）——大众媒介可以通过反复报道来赋予议题不同程度的显著性，影响公众对议题重要性的判断。\n\n2. **第二层次：属性显著性**（1997年，麦库姆斯）——媒体不仅告诉人们\"想什么\"，还通过选择、强调特定属性来影响人们\"怎么想\"。\n\n3. **第三层次：网络议程设置**（2011年，郭蕾和麦库姆斯）——媒体通过关联不同议题来影响公众的认知网络结构。\n\n新媒体环境下的发展：\n- 议程设置主体多元化（从专业媒体到自媒体、算法）\n- 议程融合理论（个体主动选择媒介来满足议程需求）\n- 反向议程设置（网络议题影响传统媒体议程）",
            "score": 15,
            "analysis": "需要完整回答三个层次的提出者、核心观点和发展脉络",
            "scoring_points": ["三个层次各3分", "新媒体发展6分"],
            "framework": "概念→三个层次→新媒体发展→总结",
            "difficulty": 4,
        },
        # 沉默的螺旋
        {
            "kp_id": get_kp_id("沉默的螺旋"),
            "subject": "440",
            "year": 2023,
            "school": "深圳大学",
            "type": "essay",
            "content": "请论述沉默的螺旋理论的核心观点，并分析该理论在新媒体环境下的适用性",
            "answer": "一、沉默的螺旋理论核心观点\n\n诺依曼（1974）提出，包含三个核心假设：\n1. 社会对偏离的恐惧——个体害怕被孤立\n2. 对舆论的持续感知——人们通过准统计官能感知舆论\n3. 公开表达与沉默的倾向——优势意见越来越强，劣势意见越来越弱\n\n二、新媒体环境下的适用性\n\n支持观点：\n- 网络舆论依然存在沉默效应\n- 社交媒体的点赞、转发机制强化了从众心理\n- 算法推荐可能强化信息茧房\n\n反对观点：\n- 网络匿名性减弱了被孤立的恐惧\n- 多元表达渠道打破了传统媒体的垄断\n- 网络社群为少数意见提供了支持\n\n三、结论\n沉默的螺旋在新媒体环境下依然适用，但表现形式和作用机制发生了变化。",
            "score": 30,
            "analysis": "需要完整论述理论核心观点，并辩证分析新媒体适用性",
            "scoring_points": ["理论核心观点10分", "新媒体适用性15分", "结论5分"],
            "framework": "理论概述→核心假设→新媒体适用性（正反）→结论",
            "difficulty": 5,
        },
        # 新闻价值
        {
            "kp_id": get_kp_id("新闻价值"),
            "subject": "334",
            "year": 2024,
            "school": "深圳大学",
            "type": "short_answer",
            "content": "新闻价值的五要素是什么？请举例说明",
            "answer": "新闻价值五要素：\n\n1. **时新性**：事件发生的时间近、内容新。如突发新闻事件。\n2. **重要性**：影响范围大、涉及人数多。如国家政策调整。\n3. **显著性**：人物、地点的知名度。如名人动态。\n4. **接近性**：地理或心理上的接近。如本地新闻。\n5. **趣味性**：人情味、新奇性。如奇闻趣事。\n\n在新媒体环境下，新闻价值判断发生了变化：\n- 时效性要求更高（实时报道）\n- 接近性扩展到心理接近\n- 趣味性被算法放大",
            "score": 15,
            "analysis": "需要准确列出五要素并举例说明",
            "scoring_points": ["五要素各2分", "举例说明3分", "新媒体发展2分"],
            "framework": "五要素定义→举例→新媒体变化",
            "difficulty": 3,
        },
        # 政治
        {
            "kp_id": get_kp_id("对立统一"),
            "subject": "政治",
            "year": 2024,
            "school": None,
            "type": "short_answer",
            "content": "简述对立统一规律是唯物辩证法的实质和核心",
            "answer": "对立统一规律之所以是唯物辩证法的实质和核心，是因为：\n\n1. 对立统一规律揭示了事物普遍联系的根本内容和变化发展的内在动力\n2. 对立统一规律是贯穿量变质变规律、否定之否定规律以及唯物辩证法基本范畴的中心线索\n3. 对立统一规律提供了人们认识世界和改造世界的根本方法——矛盾分析法\n4. 是否承认对立统一规律是辩证法和形而上学对立的实质",
            "score": 10,
            "analysis": "需要从四个方面回答",
            "scoring_points": ["揭示联系和发展2.5分", "贯穿其他规律2.5分", "矛盾分析法2.5分", "辩证法与形而上学2.5分"],
            "framework": "总论点→四个方面的论证",
            "difficulty": 3,
        },
        # 使用与满足
        {
            "kp_id": get_kp_id("使用与满足"),
            "subject": "440",
            "year": 2023,
            "school": "深圳大学",
            "type": "short_answer",
            "content": "简述使用与满足理论的主要内容和四种需求",
            "answer": "使用与满足理论由卡茨等人于1974年提出，核心观点：受众是主动的，基于特定需求选择和使用媒介来获得满足。\n\n四种需求：\n1. **认知需求**：获取信息、知识\n2. **情感需求**：审美体验、情感愉悦\n3. **个人整合需求**：自信、地位、身份认同\n4. **社会整合需求**：社交联系、归属感\n\n理论意义：\n- 从传者中心转向受者中心\n- 强调受众的主动性\n- 为理解新媒体使用提供理论框架",
            "score": 15,
            "analysis": "需要答出核心观点、四种需求和理论意义",
            "scoring_points": ["核心观点3分", "四种需求8分", "理论意义4分"],
            "framework": "理论概述→四种需求→理论意义",
            "difficulty": 3,
        },
        # 媒介融合
        {
            "kp_id": get_kp_id("媒介融合"),
            "subject": "334",
            "year": 2024,
            "school": "深圳大学",
            "type": "essay",
            "content": "论述媒体深度融合的路径与挑战",
            "answer": "一、媒体融合的发展阶段\n\n1. 相加阶段：传统媒体与新媒体简单叠加\n2. 相融阶段：内容、渠道、平台初步融合\n3. 深度融合阶段：体制机制、人才队伍、经营模式全面融合\n\n二、深度融合的路径\n\n1. 中央厨房模式：一次采集、多种生成、多元传播\n2. 县级融媒体中心：打通最后一公里\n3. 四全媒体建设：全程、全息、全员、全效\n4. 技术赋能：AI、大数据、5G等技术应用\n\n三、面临的挑战\n\n1. 体制机制障碍：传统媒体管理体制改革滞后\n2. 人才短缺：复合型人才不足\n3. 盈利模式不清：传统广告收入下降\n4. 技术投入不足：资金和技术瓶颈\n\n四、对策建议\n\n1. 深化体制机制改革\n2. 加强人才培养和引进\n3. 探索多元化经营模式\n4. 加大技术投入和创新",
            "score": 30,
            "analysis": "需要有阶段分析、路径解读和挑战讨论",
            "scoring_points": ["发展阶段6分", "融合路径10分", "面临挑战8分", "对策建议6分"],
            "framework": "发展阶段→融合路径→挑战→对策",
            "difficulty": 4,
        },
        # 框架理论
        {
            "kp_id": get_kp_id("框架"),
            "subject": "440",
            "year": 2022,
            "school": "深圳大学",
            "type": "short_answer",
            "content": "简述框架理论与议程设置理论的联系与区别",
            "answer": "联系：\n- 两者都关注媒体对受众认知的影响\n- 都属于传播效果研究范畴\n- 都涉及信息的选择性呈现\n\n区别：\n1. 影响层面不同：议程设置影响\"想什么\"（议题显著性），框架理论影响\"怎么想\"（属性层面）\n2. 作用机制不同：议程设置通过显著性转移，框架理论通过选择、强调和排除\n3. 研究层次不同：议程设置关注议题层面，框架理论关注属性层面\n4. 理论来源不同：议程设置源于政治传播研究，框架理论源于社会学",
            "score": 15,
            "analysis": "需要答出联系和区别",
            "scoring_points": ["联系4分", "区别11分"],
            "framework": "联系→区别→总结",
            "difficulty": 4,
        },
        # 把关人
        {
            "kp_id": get_kp_id("把关人"),
            "subject": "440",
            "year": 2023,
            "school": "深圳大学",
            "type": "short_answer",
            "content": "简述把关人理论在新媒体时代的变化",
            "answer": "传统媒体时代：编辑是主要把关人，信息传播是线性的、单向的。\n\n新媒体时代的变化：\n\n1. 把关权转移：从专业编辑转向算法、平台和用户\n2. 去中心化把关：多个主体参与把关过程\n3. 算法把关：推荐算法成为重要把关机制\n4. 用户把关：用户通过点赞、分享等行为参与把关\n5. 把关标准变化：从专业标准转向流量标准\n\n面临的挑战：\n- 虚假信息泛滥\n- 信息茧房加剧\n- 算法偏见\n- 公共利益受损",
            "score": 15,
            "analysis": "需要答出传统把关和新媒体把关的区别",
            "scoring_points": ["传统把关3分", "新媒体变化8分", "面临挑战4分"],
            "framework": "传统把关→新媒体变化→挑战",
            "difficulty": 3,
        },
        # 培养理论
        {
            "kp_id": get_kp_id("培养理论"),
            "subject": "440",
            "year": 2022,
            "school": "深圳大学",
            "type": "short_answer",
            "content": "简述培养理论的主要内容和核心概念",
            "answer": "主要内容：大众传媒通过长期的、潜移默化的影响，会塑造受众对现实世界的认知。\n\n核心概念：\n1. **主流化**：重度电视观众的世界观趋于一致，趋向于电视所呈现的\"符号现实\"\n2. **共鸣**：电视内容与个人亲身经历一致时，培养效果会增强\n3. **第一级信念**：对具体事实的认知\n4. **第二级信念**：对整体世界观的影响\n\n理论意义：\n- 揭示了大众传播的长期、潜在效果\n- 为理解媒体与社会的关系提供新视角\n- 对新媒体环境下的信息茧房研究有启示",
            "score": 15,
            "analysis": "需要答出主要内容和核心概念",
            "scoring_points": ["主要内容3分", "核心概念8分", "理论意义4分"],
            "framework": "主要内容→核心概念→理论意义",
            "difficulty": 3,
        },
        # 知沟理论
        {
            "kp_id": get_kp_id("知沟"),
            "subject": "440",
            "year": 2024,
            "school": "深圳大学",
            "type": "short_answer",
            "content": "简述知沟理论的主要内容和影响因素",
            "answer": "主要内容：随着大众传播的信息量增加，社会经济地位较高的人获取知识的速度快于地位低的人，两者之间的知识差距会扩大。\n\n影响因素：\n1. 传播技能：教育水平影响信息理解和吸收能力\n2. 信息储备：已有知识影响新知识的获取\n3. 社会交往：社交范围影响信息来源\n4. 选择性接触：态度和兴趣影响信息选择\n5. 媒介性质：不同媒介的受众定位不同\n\n新媒体环境下的发展：\n- 数字鸿沟概念的提出\n- 接入鸿沟、使用鸿沟、知识鸿沟三个层次\n- 技术发展可能缩小也可能扩大知沟",
            "score": 15,
            "analysis": "需要答出主要内容、影响因素和新媒体发展",
            "scoring_points": ["主要内容3分", "影响因素7分", "新媒体发展5分"],
            "framework": "主要内容→影响因素→新媒体发展",
            "difficulty": 3,
        },
        # 信息茧房
        {
            "kp_id": get_kp_id("信息茧房"),
            "subject": "440",
            "year": 2023,
            "school": "深圳大学",
            "type": "essay",
            "content": "论述信息茧房的形成机制、社会影响及应对策略",
            "answer": "一、形成机制\n\n1. 个体层面：选择性接触心理，只关注自己感兴趣的信息\n2. 技术层面：算法推荐根据用户偏好推送相似内容\n3. 社交层面：社交圈层化，与相似观点的人互动\n4. 平台层面：平台追求用户粘性，强化个性化推荐\n\n二、社会影响\n\n1. 信息窄化：视野受限，认知偏差\n2. 群体极化：观点趋同，极端化倾向\n3. 社会撕裂：不同群体间共识减少\n4. 民主危机：理性讨论空间被压缩\n\n三、应对策略\n\n1. 个人层面：提升媒介素养，主动拓展信息来源\n2. 平台层面：优化算法，增加多样性推荐\n3. 政府层面：加强监管，规范算法推荐行为\n4. 社会层面：促进跨群体对话，增进社会共识",
            "score": 30,
            "analysis": "需要从形成机制、社会影响和应对策略三个维度分析",
            "scoring_points": ["形成机制10分", "社会影响10分", "应对策略10分"],
            "framework": "形成机制→社会影响→应对策略",
            "difficulty": 4,
        },
        # 新闻真实
        {
            "kp_id": get_kp_id("新闻真实"),
            "subject": "334",
            "year": 2024,
            "school": "深圳大学",
            "type": "short_answer",
            "content": "新闻真实性的三个层次是什么？",
            "answer": "新闻真实性的三个层次：\n\n1. **具体真实**：单条新闻报道的事实准确无误，包括时间、地点、人物、事件等要素真实\n2. **整体真实**：连续报道能够反映事物的全貌，避免以偏概全\n3. **本质真实**：报道能够揭示事物的本质和规律，而非停留在表面现象\n\n在新媒体环境下，维护新闻真实性面临挑战：\n- 信息传播速度加快，核实时间缩短\n- 自媒体泛滥，专业把关弱化\n- 虚假信息、谣言传播更容易",
            "score": 15,
            "analysis": "需要答出三个层次及新媒体挑战",
            "scoring_points": ["三个层次各3分", "新媒体挑战6分"],
            "framework": "三个层次→新媒体挑战",
            "difficulty": 3,
        },
        # 广告学
        {
            "kp_id": get_kp_id("广告"),
            "subject": "334",
            "year": 2023,
            "school": "深圳大学",
            "type": "short_answer",
            "content": "简述广告传播的AIDMA模型",
            "answer": "AIDMA模型是广告传播的经典模型，描述消费者从接触广告到购买行为的心理过程：\n\n1. **Attention（注意）**：吸引消费者注意力\n2. **Interest（兴趣）**：引发消费者兴趣\n3. **Desire（欲望）**：激发购买欲望\n4. **Memory（记忆）**：形成品牌记忆\n5. **Action（行动）**：促成购买行动\n\n在数字营销时代的发展：\n- AISAS模型：注意→兴趣→搜索→行动→分享\n- 强调搜索和分享环节\n- 社交媒体和搜索引擎的作用增强",
            "score": 15,
            "analysis": "需要答出AIDMA各环节含义及数字时代发展",
            "scoring_points": ["AIDMA各环节8分", "数字时代发展7分"],
            "framework": "AIDMA各环节→数字时代发展",
            "difficulty": 3,
        },
        # 公共关系
        {
            "kp_id": get_kp_id("公共关系"),
            "subject": "334",
            "year": 2024,
            "school": "深圳大学",
            "type": "short_answer",
            "content": "简述危机公关的5S原则",
            "answer": "危机公关的5S原则：\n\n1. **承担责任原则（Shoulder）**：主动承担责任，不推诿、不逃避\n2. **真诚沟通原则（Sincerity）**：与公众真诚沟通，不隐瞒、不欺骗\n3. **速度第一原则（Speed）**：快速响应，抢占舆论先机\n4. **系统运行原则（System）**：统一口径，系统应对\n5. **权威证实原则（Standard）**：用权威证据说话，增强可信度\n\n案例分析：\n- 企业产品质量危机的应对\n- 公共卫生事件中的信息沟通\n- 网络舆情危机的处理",
            "score": 15,
            "analysis": "需要答出5S原则的具体内容",
            "scoring_points": ["5S原则各2分", "案例分析5分"],
            "framework": "5S原则→案例分析",
            "difficulty": 3,
        },
        # 英语阅读
        {
            "kp_id": get_kp_id("主旨题"),
            "subject": "英语",
            "year": 2024,
            "school": None,
            "type": "short_answer",
            "content": "英语阅读理解主旨题的解题技巧",
            "answer": "主旨题解题技巧：\n\n1. **识别题型**：常见题干词 main idea, mainly discuss, best title, purpose\n2. **定位主题句**：通常在首段或末段，各段首句\n3. **把握文章结构**：总分总、问题-解决、现象-分析\n4. **排除干扰项**：过于宽泛、过于细节、以偏概全\n5. **关注转折词**：but, however, yet 后面往往是重点\n\n解题步骤：\n1. 快速浏览首尾段和各段首句\n2. 把握文章整体脉络\n3. 选择最能概括全文的选项\n4. 检验选项是否与文章主旨一致",
            "score": 10,
            "analysis": "需要答出解题技巧和步骤",
            "scoring_points": ["识别题型2分", "定位主题句2分", "排除干扰项3分", "解题步骤3分"],
            "framework": "识别题型→定位主题句→排除干扰项→解题步骤",
            "difficulty": 2,
        },
        # 政治-辩证法
        {
            "kp_id": get_kp_id("质量互变"),
            "subject": "政治",
            "year": 2024,
            "school": None,
            "type": "short_answer",
            "content": "简述质量互变规律的基本内容",
            "answer": "质量互变规律的基本内容：\n\n1. **质、量、度的含义**\n   - 质：一事物区别于他事物的内在规定性\n   - 量：事物存在和发展的规模、程度、速度等\n   - 度：保持事物质的量的限度\n\n2. **量变和质变的辩证关系**\n   - 量变是质变的必要准备\n   - 质变是量变的必然结果\n   - 质变体现和巩固量变的成果\n\n3. **方法论意义**\n   - 坚持适度原则\n   - 重视量的积累\n   - 抓住时机促成质变",
            "score": 10,
            "analysis": "需要答出质、量、度的含义及辩证关系",
            "scoring_points": ["质、量、度各2分", "辩证关系3分", "方法论意义3分"],
            "framework": "质、量、度→辩证关系→方法论意义",
            "difficulty": 3,
        },
        # 政治-认识论
        {
            "kp_id": get_kp_id("实践"),
            "subject": "政治",
            "year": 2023,
            "school": None,
            "type": "short_answer",
            "content": "简述实践与认识的辩证关系",
            "answer": "实践与认识的辩证关系：\n\n1. **实践决定认识**\n   - 实践是认识的来源\n   - 实践是认识发展的动力\n   - 实践是检验真理的唯一标准\n   - 实践是认识的目的\n\n2. **认识反作用于实践**\n   - 正确的认识促进实践发展\n   - 错误的认识阻碍实践发展\n\n3. **认识的辩证过程**\n   - 从感性认识到理性认识\n   - 从理性认识到实践\n   - 认识运动的不断反复和无限发展\n\n4. **方法论意义**\n   - 坚持实践第一的观点\n   - 坚持理论与实践相结合\n   - 在实践中检验和发展真理",
            "score": 10,
            "analysis": "需要答出实践与认识的辩证关系",
            "scoring_points": ["实践决定认识4分", "认识反作用2分", "辩证过程2分", "方法论意义2分"],
            "framework": "实践决定认识→认识反作用→辩证过程→方法论意义",
            "difficulty": 3,
        },
    ]

    count = 0
    for q in questions:
        db.execute(
            "INSERT INTO exam_questions (id, knowledge_point_id, subject, year, school, question_type, content, answer, score, analysis, scoring_points, answer_framework, difficulty) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (generate_id(), q["kp_id"], q["subject"], q["year"], q["school"], q["type"],
             q["content"], q["answer"], q["score"], q["analysis"],
             json.dumps(q["scoring_points"]), q["framework"], q["difficulty"])
        )
        count += 1

    db.commit()
    db.close()
    print(f"✅ 真题创建完成：{count} 道")


if __name__ == "__main__":
    # 先初始化数据库表
    from database import init_db
    init_db()
    print("✅ 数据库表初始化完成")

    print("=" * 50)
    print("开始构建知识库...")
    print("=" * 50)

    seed_subjects()
    seed_chapters()
    seed_knowledge_points()
    seed_politics_knowledge()
    seed_english_knowledge()
    seed_knowledge_relations()
    seed_exam_questions()

    # 统计
    db = get_db()
    subjects_count = db.execute("SELECT COUNT(*) FROM subjects").fetchone()[0]
    chapters_count = db.execute("SELECT COUNT(*) FROM chapters").fetchone()[0]
    points_count = db.execute("SELECT COUNT(*) FROM knowledge_points").fetchone()[0]
    relations_count = db.execute("SELECT COUNT(*) FROM knowledge_relations").fetchone()[0]
    exams_count = db.execute("SELECT COUNT(*) FROM exam_questions").fetchone()[0]
    db.close()

    print("\n" + "=" * 50)
    print("知识库构建完成！")
    print(f"  学科：{subjects_count}")
    print(f"  章节：{chapters_count}")
    print(f"  知识点：{points_count}")
    print(f"  知识关系：{relations_count}")
    print(f"  真题：{exams_count}")
    print("=" * 50)
