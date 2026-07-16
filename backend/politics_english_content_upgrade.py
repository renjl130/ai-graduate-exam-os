from __future__ import annotations

import csv
import hashlib
import json
import os
import re
import sqlite3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "backend" / "exam_os.db"
MIGRATIONS = ROOT / "cloudflare" / "migrations"
ECDICT = Path(os.environ.get("ECDICT_CSV", Path(os.environ.get("TEMP", ".")) / "ECDICT-repo" / "ecdict.csv"))

ENGLISH_RAW = r"""
ch_eng_grammar|句子成分与词性|structure|英语句法分析先确认谓语，再判断主语、宾语、补语、定语和状语；同一个词在不同语境中可以承担不同词性和句法功能。|谓语是有限动词并承担时态语态；宾语由及物动词或介词支配；补语补足主语或宾语的身份状态；定语修饰名词，状语修饰动词形容词副词或全句|The rapid growth of cities has changed society.→主语中心词growth，谓语has changed，of cities作后置定语，rapid作前置定语；They found the proposal practical.→proposal是宾语，practical是宾补|把介词短语误判为谓语；看到动词形式就当谓语；混淆双宾语与宾语补足语
ch_eng_grammar|名词的数、格与一致|morph|可数名词必须处理单复数，不可数名词不能随意加复数；名词所有格和of结构表达所属、来源、类别或部分整体关系。|规则复数与不规则复数；集合名词按整体或成员决定一致；抽象名词物质名词可在语境中可数化；双重所有格表示部分关系|The committee has reached its decision.→committee视为整体；Two pieces of evidence were omitted.→evidence不可数，借助piece量化|information/evidence/research随意加s；people与persons不分语境；the students'与the student's混淆
ch_eng_grammar|冠词与零冠词|morph|a/an表示类别中的一个或首次提及，the表示双方可识别、前文已提及或具有唯一性，零冠词常用于复数或不可数名词的泛指。|a/an由读音而非字母决定；the可由后置修饰语限定；专有名词、学科、语言和三餐通常零冠词；乐器、序数词和最高级常用the|Education is a public good.→抽象概念泛指用零冠词；The education offered by the program is practical.→后置定语限定后用the|按中文“一个”机械加a；泛指复数前加the；忽略元音音素导致a hour
ch_eng_grammar|代词、指代与一致|morph|代词必须在数、性、人称和语义上与先行词一致；阅读与翻译中要根据最近合理先行词、语义角色和篇章主题共同还原指代。|it可指物、形式主语宾语或前述事实；they可回指复数名词或泛指人群；this/that可概括前句命题；one/ones替代同类名词|Many policies fail because they ignore local conditions.→they回指policies；It is difficult to measure trust.→it为形式主语|只按距离确定先行词；把形式it翻译成“它”；one与it混用
ch_eng_grammar|限定词、数量词与部分结构|morph|限定词决定名词的指称范围；all/both/either/neither/each/every/many/much/few/little等必须与可数性、单复数和语义范围匹配。|each/every后接单数但强调整体方式不同；few/little含否定，a few/a little含肯定；either指两者之一，any可指三者以上；数量词可与of结构构成部分关系|Each participant was interviewed.→each要求单数谓语；A few studies provide convincing evidence.→表示存在少量有效研究|every后接复数；much students；both of后遗漏限定词
ch_eng_grammar|主谓一致|verb|谓语与语法主语在人称和数上保持一致，但就近一致、意义一致和插入成分会干扰判断。|介词短语不改变主语中心词；either...or/neither...nor常按就近原则；a number of接复数，the number of接单数；时间金钱距离作整体可用单数|The quality of the reports is uneven.→主语中心词quality；A number of students are applying, but the number is falling.→两个number结构规则不同|被of后的复数名词诱导；把news当复数；there be不看后置主语
ch_eng_grammar|一般时态|verb|一般时描述习惯、规律、稳定状态、叙事事实或在特定时间完成的过去事件，时态选择必须服从时间定位与语篇视角。|一般现在时用于客观规律和常态；一般过去时用于与现在切断的过去事件；一般将来时表达预测意愿安排；时间条件从句常用现在时表将来|Research shows that trust matters.→论文陈述常用一般现在时；The survey was conducted in 2024.→明确过去时间用一般过去时|有since仍用一般过去时；条件从句写will；历史事实与作者当前观点时态混写
ch_eng_grammar|进行时态|verb|进行体把动作呈现为某一参照时点正在展开、暂时持续或逐渐变化的过程，并可表达近期安排或带感情色彩的反复。|be doing是基本结构；状态动词通常不用进行体；进行体可突出变化趋势；过去进行时常提供背景|Digital platforms are reshaping public debate.→强调持续变化；She was reading when the call arrived.→进行动作与突发事件形成背景|know/belong等状态动词滥用进行体；把进行时等同“正在”而忽略趋势与临时性
ch_eng_grammar|完成时态|verb|完成体连接两个时间层：动作发生在参照点之前，但结果、经验或持续状态与参照点有关。|现在完成时连接过去与现在；过去完成时表示过去的过去；since接起点，for接时段；瞬间动词与持续时间连用时需改为状态表达|The policy has influenced later reforms.→过去影响延续到现在；By 2020, researchers had collected enough data.→过去参照点之前完成|与明确过去时间yesterday连用现在完成时；had done没有过去参照点；since与for混用
ch_eng_grammar|完成进行时|verb|完成进行体强调动作从过去开始持续到参照点，突出过程、反复或可观察结果，与完成时的结果焦点不同。|have been doing连接过去与现在；had been doing连接过去两个时点；适合持续活动而非瞬间动作；结果明显时可解释当前状态|Researchers have been debating the issue for decades.→突出持续过程；The ground was wet because it had been raining.→过程解释过去结果|所有持续动作都机械使用完成进行时；忽略状态动词限制；与完成时意义不加区分
ch_eng_grammar|情态动词|verb|情态动词表达能力、许可、义务、推测、意愿或委婉态度，后接动词原形且不随人称变化。|must表示强义务或高把握推测；have to偏客观必要；may/might表示可能；should可表示义务或按理推测；情态动词+have done表示对过去判断|The result may reflect sampling bias.→谨慎推测；The rule must be followed.→强义务|mustn't与needn't混淆；情态动词后加to；may have done与should have done含义混淆
ch_eng_grammar|助动词、否定与疑问|verb|be、do、have既可作实义动词也可作助动词；否定、疑问、强调和替代结构依靠助动词完成。|一般时无其他助动词时用do；完成体用have；进行体和被动用be；助动词后动词形式由结构决定；do可加强肯定语气|Why did the policy fail?→did承担疑问和过去时，fail用原形；The evidence does support the claim.→does表示强调|did后仍用过去式；have与have got混写；否定词位置错误
ch_eng_grammar|被动语态的完整系统|verb|被动语态用be/get+过去分词突出承受者、过程或结果；能否被动取决于动词是否支配宾语以及语义是否允许。|各时态的被动由be承担时态；情态被动为modal+be done；短语动词变被动不能丢介词；get被动更口语且常含意外变化；by短语只在施事重要时保留|The proposal has been widely discussed.→现在完成时被动；The problem must be dealt with.→短语动词介词保留|只见be+done就判被动而忽略系表结构；遗漏介词；不及物动词强行变被动
ch_eng_grammar|不定式|nonfinite|不定式可作主语、宾语、表语、定语、状语和补语，常表达目的、将来倾向或具体一次性动作。|to do为一般式；to be doing强调同时进行；to have done表示先于谓语；疑问词+不定式构成名词性结构；省略to取决于使役感官等结构|To reduce inequality requires sustained effort.→不定式短语作主语；The study is believed to have influenced policy.→完成式表示先发生|介词后误接to do；否定式not位置错误；把介词to与不定式to混淆
ch_eng_grammar|动名词|nonfinite|动名词具有名词功能又保留动词配价，可作主语、宾语、表语和介词宾语，常表达一般性活动或已发生经验。|介词后用doing；avoid/admit/consider等常接doing；动名词可有逻辑主语；完成式having done强调先发生|Reading critically requires checking evidence.→作主语；He objected to changing the rule.→to是介词|把look forward to后的to当不定式；stop doing与stop to do混淆；逻辑主语格使用不当
ch_eng_grammar|现在分词与过去分词|nonfinite|分词可作定语、状语和补语；现在分词通常表示主动或进行，过去分词通常表示被动、完成或状态。|分词逻辑主语原则上与主句主语一致；前置分词与后置分词修饰范围不同；感情形容词-ing/-ed区分事物特征与人的感受；完成分词表示先发生|Facing limited resources, the team changed its plan.→team是facing的逻辑主语；Data collected online may be biased.→collected表被动|悬垂分词；interesting/interested混用；过去分词一律译成“被”
ch_eng_grammar|独立主格与with复合结构|nonfinite|独立主格由名词或代词加非谓语、形容词、副词或介词短语构成，与主句存在逻辑关系但有独立主语。|名词+doing表主动进行；名词+done表被动完成；名词+to do表将来；with+宾语+补语更常见；翻译时补出逻辑连词|Weather permitting, the survey will continue.→条件；With the data collected, the team began analysis.→背景完成|把独立主格当完整句；逻辑主语缺失；with后补语形式与宾语关系不符
ch_eng_grammar|主语从句|clause|主语从句把一个命题整体放在主语位置，常由that、whether、疑问词或what引导；较长主语从句常后置并用形式主语it。|that只起连接作用；whether表示是否；what在从句中作成分；It is+形容词/名词/过去分词+从句是高频结构|What matters is how evidence is used.→what在从句中作主语；It remains unclear whether the policy works.→whether从句后置|what与that混用；主语从句仍用疑问语序；形式主语it与指代it混淆
ch_eng_grammar|宾语从句|clause|宾语从句作动词、介词或形容词的宾语，必须使用陈述语序，并根据谓语语义选择that、whether/if或疑问词。|that常可省略但并列从句第二个that不宜省；whether比if适用范围更广；介词后通常用whether；时态呼应服从事实真值|Researchers argue that context matters.→that从句作宾语；We disagree about whether the change is necessary.→介词后用whether|从句用疑问语序；介词后用if；客观真理机械退为过去时
ch_eng_grammar|表语从句与同位语从句|clause|表语从句说明主语内容，同位语从句解释抽象名词的具体内容；二者与定语从句的区别在于从句是否缺少成分。|表语从句位于系动词后；同位语从句常跟fact/idea/claim/evidence/question等；that在同位语从句中不作成分；定语从句关系词必须承担成分|The fact is that trust takes time.→表语从句；The claim that the method is neutral is disputed.→同位语从句解释claim|把同位语that当关系代词；同位语从句与定语从句只按位置判断；reason后的表语从句误用because/that
ch_eng_grammar|限制性与非限制性定语从句|clause|限制性定语从句限定先行词范围，是名词短语不可缺少的一部分；非限制性从句提供补充信息，用逗号隔开且不能用that。|关系代词在从句中作主宾定；作宾语时限制性从句可省略；which可指代前面整句话；whose可指人或物的所属|Students who revise regularly improve faster.→限定哪类学生；The report, which was published yesterday, challenges the theory.→补充信息|非限制性从句用that；逗号随意添加；关系词省略后从句缺主语
ch_eng_grammar|介词加关系代词与关系副词|clause|介词+which/whom把从句内部介词前置，关系副词when/where/why相当于介词+which，但是否使用取决于从句中缺少的成分。|先行词是地点不必然用where；从句缺宾语时用which/that；介词选择来自从句搭配；the way后可用that/in which或省略|The method by which data were collected matters.→by来自collect by the method；The city where the study took place changed rapidly.→where作地点状语|看到时间地点原因名词就机械选when/where/why；介词与动词搭配不符；介词后用that
ch_eng_grammar|条件、让步与原因状语从句|clause|状语从句表达命题之间的条件、让步、原因和结果关系；连接词必须与真实逻辑一致，不能只凭中文对应。|if/unless/provided that表条件；although/though/while/even if表让步；because强调直接原因，since/as常提供背景；so...that与such...that表达结果|Although the sample is small, the pattern is clear.→让步不等于转折并列；Unless evidence improves, the claim remains weak.→unless=if not|although与but并用；because与so并用；unless后再加not
ch_eng_grammar|目的、结果、方式与比较状语|clause|目的从句说明行为目标，结果从句说明实际后果，方式和比较从句说明行为如何发生或不同对象之间的对应关系。|so that/in order that表目的并常含情态动词；so/such...that表结果；as/just as表方式；than/as...as从句常发生省略|The terms were defined clearly so that readers could compare the studies.→目的；The change was so rapid that institutions could not adapt.→结果|把so that所有用法都判目的；比较对象不平行；than从句省略后错误补全
ch_eng_grammar|真实条件与虚拟条件|special|真实条件讨论可能发生的条件，虚拟条件表达与现在、过去或将来事实相反或可能性很低的假设。|现在反事实if+过去式，主句would do；过去反事实if+had done，主句would have done；将来低可能可用were to/should；省略if时had/were/should倒装|If the sample were larger, the estimate would be more reliable.→现在反事实；Had the warning been heeded, the loss could have been avoided.→过去反事实倒装|所有if都用虚拟；主从句时间错配；were/was规则不分正式语体
ch_eng_grammar|wish、as if与建议命令类虚拟|special|wish、if only、as if、would rather等表达愿望或非事实比较；suggest/insist/demand等表示建议命令时从句常用should+动词原形。|wish过去式表对现在遗憾，had done表过去遗憾；as if是否虚拟取决于真实性；suggest表示“暗示”不用虚拟；insist表示“坚持认为”不用虚拟|I wish the evidence were clearer.→对现在愿望；The data suggest that the trend is real.→suggest为“表明”不用虚拟|见suggest一律用should；wish与hope混用；would rather从句时态错误
ch_eng_grammar|倒装、强调与否定前置|special|倒装用于语法要求或信息强调；强调句It is/was...that/who...只能强调句子成分，移除框架后原句仍应完整。|否定副词置首触发部分倒装；only+状语置首倒装；so/neither/nor表示相同情况；地点方向副词置首可完全倒装；强调句不能强调谓语|Only then did the problem become clear.→部分倒装；It was the method that caused the bias.→强调method|only修饰主语仍倒装；强调句与主语从句混淆；否定前置后忘记助动词
ch_eng_grammar|省略、替代与平行结构|special|省略删除可由语境恢复的成分，替代用do/so/one等避免重复；平行结构要求并列项在语法形式和逻辑层级上对应。|比较从句和状语从句常省略；do so替代动词短语；one/ones替代可数名词；not only...but also连接同类成分；相关并列词决定一致|The policy aims to reduce costs and improve access.→两个不定式平行；Some studies support the claim, while others do not.→do not替代support the claim|并列名词与从句；省略后产生歧义；one替代不可数名词
ch_eng_grammar|it结构与there存在句|special|it可作指代词、形式主语、形式宾语或强调结构成分；there be引入新信息，真正主语位于be之后。|It takes...to do表示耗时；find it+补语+to do为形式宾语；there be的数通常与最近主语协调；there可与seem/appear/remain等连用|We find it difficult to separate cause from correlation.→形式宾语；There appear to be several explanations.→存在句扩展|所有it都译“它”；there be与have混用；形式宾语后漏to do
ch_eng_grammar|比较结构与倍数表达|special|比较结构必须明确比较对象、范围和维度，并保持两端语法与逻辑平行。|比较级+than；as...as；the+比较级...,the+比较级...；倍数可用times as...as或times the noun of；no more than与not more than意义不同|The new method is twice as efficient as the old one.→比较对象平行；The more data we collect, the clearer the pattern becomes.→联动比较|比较对象偷换；倍数位置错误；最高级遗漏比较范围
ch_eng_grammar|否定范围、部分否定与双重否定|special|否定词的位置决定否定范围；all/both/every与not组合常构成部分否定，never、hardly、scarcely等具有否定意义。|not all=并非全部；none=全部不；not necessarily=未必；fail to/not uncommon等可形成委婉或双重否定；否定转移常见于think/believe/suppose|Not all correlations indicate causation.→部分否定；The result is not uncommon.→并非罕见|把not all译成“全部不”；忽略hardly的否定；否定转移按字面处理
ch_eng_grammar|标点、并列与句子边界|special|英语完整句之间不能只用逗号连接；逗号、分号、冒号、破折号和括号分别表示不同层级的停顿与逻辑。|两个独立分句用句号、分号或并列连词；冒号引出解释或列举；非限制性成分用逗号隔开；分号可连接紧密相关独立句|The evidence is limited; nevertheless, the conclusion is plausible.→分号连接独立句；The study has one weakness: its sample is small.→冒号解释|逗号拼接句；连接副词前只用逗号；限制性成分误加逗号
"""

POLITICS_RAW = r"""
ch_pol_my_phil|世界的物质统一性|principle|世界统一于物质，物质是不依赖人的意识并能为人的意识所反映的客观实在；运动、时间和空间是物质存在的基本形式。|坚持从客观实际出发；反对把精神或观念当作世界本原；承认意识具有能动反作用但不能脱离物质条件；自然界与人类社会都具有客观物质性|材料把主观愿望当作现实条件时，应指出其违背物质决定意识；材料强调调查研究和因地制宜时，应联系一切从实际出发
ch_pol_my_phil|矛盾的普遍性与特殊性|principle|矛盾普遍性说明矛盾存在于一切事物发展过程，特殊性说明不同事物及同一事物不同阶段的矛盾各有特点；二者相互联结并在一定条件下转化。|普遍性寓于特殊性之中并通过特殊性表现；特殊性包含普遍性；具体问题具体分析是马克思主义活的灵魂；一般号召必须转化为分类施策|共同规律不能代替具体条件；地方经验可提炼一般方法但不能机械照搬；试点推广体现由特殊到一般再到特殊
ch_pol_my_phil|主要矛盾与矛盾主要方面|principle|主要矛盾在复杂事物中处于支配地位，矛盾主要方面在一个矛盾内部居于支配地位并规定事物性质。|办事情抓重点对应主要矛盾；看问题抓主流对应主要方面；二者都不是固定不变；次要矛盾和次要方面也会影响全局|中心工作与工作中的主流不是同一层次；不能以抓重点为由忽视统筹；条件变化可能引起地位转化
ch_pol_my_phil|原因结果、必然偶然与可能现实|principle|原因和结果相互作用并可在具体关系中转换；必然通过偶然表现并为自己开辟道路；现实是已经实现的可能，可能转化为现实需要根据和条件。|分析因果要防止单因论；认识必然性要研究大量偶然现象；区分现实可能与抽象可能；创造条件可推动有利可能转化|风险治理要识别诱因、机制与后果；偶发事件可暴露深层必然趋势；目标可行性必须落到资源制度和主体条件
ch_pol_my_phil|现象本质与内容形式|principle|现象是本质的外部表现，本质是事物稳定的内部联系；内容决定形式，形式反作用于内容并具有相对独立性。|透过现象把握本质需要实践和理论思维；假象也是本质的一种歪曲表现；适当形式促进内容发展；形式主义是形式脱离内容|不能以个别现象直接概括本质；制度形式要适配实际内容；评价创新既看形式变化也看是否解决实质问题
ch_pol_my_phil|感性认识与理性认识|principle|感性认识通过感觉、知觉和表象反映事物现象，理性认识通过概念、判断和推理把握本质规律；二者统一于实践。|感性认识是理性认识基础；理性认识指导感性认识深化；由感性到理性需要去粗取精去伪存真由此及彼由表及里；理性认识必须回到实践|调查材料不能自动生成正确结论；理论学习不能替代实践经验；数据分析要经过概念化比较和因果判断
ch_pol_my_phil|真理的绝对性与相对性|principle|任何真理都包含不依赖人的客观内容并具有绝对性，同时受认识条件和对象范围限制而具有相对性；二者相互包含。|绝对性体现可认识性和客观内容；相对性体现广度深度条件限制；真理发展是由相对走向绝对的过程；反对绝对主义和相对主义|科学结论可以修正不等于没有客观真理；政策适用有条件不等于任意解释；坚持真理与发展真理统一
ch_pol_my_phil|实践标准的确定性与不确定性|principle|实践是检验真理的唯一标准；其确定性在于只有实践能把主观认识与客观结果联系起来，不确定性在于具体实践具有历史局限。|实践检验具有最终权威；一次实践不能穷尽复杂认识；失败可能来自理论错误也可能来自条件不足；实践标准与逻辑证明相互补充但不能替代|试点结果要结合范围和条件评估；短期效果不能完全证明长期规律；不能用主观认可代替实践效果
ch_pol_my_phil|生产力与生产关系|society|生产力是人们解决社会同自然矛盾的实际能力，生产关系是生产过程中形成的经济关系；生产力决定生产关系，生产关系反作用于生产力。|生产力包括劳动者劳动资料劳动对象及科技因素；生产关系包括所有制地位和分配关系；适合时促进，不适合时阻碍；改革是调整不适应环节|评价制度改革要看是否解放发展生产力；技术进步会提出制度调整要求；不能把生产关系作用夸大为脱离生产力的决定力量
ch_pol_my_phil|经济基础与上层建筑|society|经济基础是一定社会占统治地位的生产关系总和，上层建筑包括政治法律制度设施和社会意识形态；经济基础决定上层建筑，上层建筑反作用于经济基础。|上层建筑具有相对独立性；政治上层建筑通常居主导；适合经济基础时服务巩固，反之阻碍；改革需统筹经济体制与政治法律文化建设|法治建设既受经济社会条件制约又能稳定预期；文化观念变化可能滞后于经济结构；不能把上层建筑简化为被动反映
ch_pol_my_pe|私人劳动与社会劳动|economy|商品生产条件下，私人劳动要通过交换转化为社会劳动；这一矛盾是简单商品经济基本矛盾，也是商品拜物教和市场风险的重要根源。|私人劳动具有独立性；社会劳动体现社会分工要求；交换成功说明个别劳动得到社会承认；供求偏离会造成价值实现困难|产品卖不出去意味着私人劳动未充分转化为社会劳动；市场调节通过价格信号事后实现社会劳动分配
ch_pol_my_pe|价值规律|economy|价值规律要求商品价值量由社会必要劳动时间决定，商品交换以价值量为基础实行等价交换；价格围绕价值波动是其表现形式。|调节生产资料和劳动力分配；刺激技术改进和劳动生产率提高；造成优胜劣汰和分化；供求影响价格但不决定价值|价格上涨可能来自供不应求但价值仍由劳动决定；企业提高个别劳动生产率可获得超额收益
ch_pol_my_pe|不变资本、可变资本与剩余价值率|economy|不变资本用于生产资料，只转移旧价值；可变资本用于购买劳动力并在生产中创造新价值；剩余价值率m'=m/v反映资本家对工人的剥削程度。|划分依据是资本不同部分在剩余价值生产中的作用；工资表现为劳动价格但实质是劳动力价值；剩余价值由可变资本带来；利润率与剩余价值率不同|机器提高生产率但不直接创造剩余价值；把全部预付资本作为剩余价值来源会掩盖劳资关系
ch_pol_my_pe|绝对剩余价值与相对剩余价值|economy|绝对剩余价值通过延长工作日或提高劳动强度增加剩余劳动时间；相对剩余价值通过提高社会劳动生产率缩短必要劳动时间。|两种方法都以劳动力价值和工作日划分为前提；相对剩余价值依赖生活资料部门生产率提高；单个企业超额剩余价值推动全社会技术进步|个别企业创新先获得超额剩余价值；普遍推广后商品社会价值下降并形成相对剩余价值条件
ch_pol_my_pe|资本有机构成与相对人口过剩|economy|资本有机构成是由技术构成决定并反映其变化的价值构成c:v；积累和技术进步通常提高资本有机构成，造成劳动力需求相对下降。|资本积聚和集中扩大资本规模；可变资本绝对量可增加但相对比重下降；相对过剩人口是资本积累产物；失业压力反过来影响工资|技术进步不等于人口绝对多余；相对过剩是相对于资本增殖需要；分析就业要同时看产业扩张和结构替代
ch_pol_my_pe|资本主义经济危机|economy|资本主义经济危机的实质是生产相对过剩，根源在生产社会化与资本主义私人占有之间的基本矛盾。|个别企业生产有组织而全社会生产无政府；生产无限扩大趋势与劳动群众有支付能力需求相对缩小冲突；危机具有周期性；危机暂时强制恢复比例关系|库存积压与购买力不足是表象；不能把危机解释为商品绝对过多；金融冲击可成为导火索但不是根本原因
ch_pol_my_pe|垄断利润、垄断价格与金融资本|economy|垄断组织凭借经济地位获得超过平均利润的垄断利润，并通过垄断价格、金融控制和对外扩张实现；垄断不能消除竞争和价值规律。|垄断价格包括垄断高价和低价；垄断利润最终来自劳动者创造价值和再分配；银行资本与工业资本融合形成金融资本；金融寡头通过参与制等控制经济|垄断价格不意味着价值规律失效；垄断与竞争并存且竞争更激烈；利润来源不能归因于纯粹价格技巧
ch_pol_my_soc|社会主义发展道路的多样性|socialism|各国走向社会主义必须遵循科学社会主义基本原则，又要同本国历史文化、发展阶段和现实条件结合，因而道路具有多样性。|基本原则与具体道路统一；不能照搬外国模式；实践探索允许曲折；评价道路要看是否解放生产力、改善人民生活并巩固制度|多样性不等于放弃共同理想；坚持原则不等于模式唯一；改革是制度自我完善而非否定根本制度
ch_pol_mao|新民主主义革命的性质与前途|history|新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义封建主义和官僚资本主义的民主革命，前途是社会主义而非建立资本主义共和国。|社会性质和主要矛盾决定革命任务；无产阶级领导决定新民主主义性质；革命分两步走且相互衔接；民主革命不能直接跳过必要阶段|旧民主主义与新民主主义的根本区别是领导权；民主革命前途不能由革命对象简单推出
ch_pol_mao|土地革命路线与群众路线|history|土地革命依靠贫雇农、联合中农、限制富农、保护中小工商业者、消灭地主阶级，解决农民土地问题并建立工农联盟。|农民问题是中国革命基本问题；土地政策随抗战等阶段调整；群众路线要求一切为了群众一切依靠群众；政策必须兼顾阶级力量和统一战线|把各时期土地政策混为一谈；只讲分田不讲政权和组织；忽略中农态度对联盟稳定的作用
ch_pol_mao|社会主义社会的基本矛盾与两类矛盾|history|社会主义社会仍存在生产力与生产关系、经济基础与上层建筑矛盾，性质和解决方式不同于旧社会；政治生活中要区分敌我矛盾和人民内部矛盾。|基本矛盾可通过制度自身调节解决；敌我矛盾用专政方法；人民内部矛盾用民主方法；正确处理人民内部矛盾是政治生活主题|把社会主义理解为没有矛盾；用同一种方式处理不同性质矛盾；忽视矛盾转化的条件
ch_pol_deng|发展才是硬道理与三个有利于|policy|发展是解决中国所有问题的关键；判断改革和工作成败主要看是否有利于发展社会主义社会生产力、增强社会主义国家综合国力、提高人民生活水平。|发展必须坚持社会主义方向；三个有利于是实践标准而非单一经济指标；改革发展稳定相统一；发展成果要由人民共享|以发展为名忽视公平生态安全；把三个有利于简化为GDP；把坚持方向与拒绝改革混同
ch_pol_deng|三步走发展战略|policy|现代化建设通过分阶段目标推进，从解决温饱、达到小康到基本实现现代化，体现从实际出发和长期战略安排。|目标分阶段；数量指标与人民生活结合；战略连续性与阶段调整统一；后续全面小康和现代化安排在此基础上展开|不能把不同历史阶段目标混写；战略目标不是自然实现，需要改革开放和制度保障
ch_pol_deng|一国两制|policy|在一个中国前提下，国家主体坚持社会主义制度，香港澳门台湾保留原有资本主义制度和生活方式，服务国家统一与长期稳定。|一个中国是前提和基础；两种制度从属并统一于一个国家；高度自治不是完全自治；中央全面管治权与特别行政区高度自治权统一|把两制置于一国之前；把高度自治解释为主权分割；忽略制度安排的历史条件
ch_pol_xi|坚持和加强党的全面领导|policy|中国共产党领导是中国特色社会主义最本质特征和中国特色社会主义制度最大优势，党的领导必须落实到改革发展稳定、内政外交国防、治党治国治军各领域。|维护党中央权威和集中统一领导；完善党的领导制度体系；提高科学民主依法执政水平；全面从严治党保证领导能力|党的领导不是包办具体事务；集中统一与发挥各方面积极性相统一；政治领导思想领导组织领导不可割裂
ch_pol_xi|新发展理念|policy|创新、协调、绿色、开放、共享的新发展理念回答发展动力、不平衡、人与自然、内外联动和社会公平问题，是相互贯通的整体。|创新是第一动力；协调是内生特点；绿色是普遍形态；开放是必由之路；共享是根本目的；完整准确全面贯彻|不能只选择有利部分贯彻；绿色与发展不是对立；共享不等于平均主义
ch_pol_xi|教育科技人才一体推进|policy|教育、科技、人才是全面建设社会主义现代化国家的基础性战略性支撑，应统筹推进教育强国、科技强国和人才强国建设。|教育培养人才并支撑创新；科技创新牵引产业升级；人才是第一资源；强化国家战略科技力量；促进创新链产业链人才链融合|只重技术设备忽视基础研究和人才培养；把人才评价等同论文数量；创新不能脱离产业和社会需求
ch_pol_xi|现代化经济体系与实体经济|policy|建设现代化经济体系必须把发展经济着力点放在实体经济上，推动产业体系高级化、智能化、绿色化并提高产业链供应链韧性。|实体经济是财富创造根基；数字经济与实体经济深度融合；制造业高质量发展；防止经济脱实向虚；统筹效率和安全|发展金融不能偏离服务实体；数字化不等于简单上设备；产业升级要兼顾就业和区域协调
ch_pol_xi|生态文明与美丽中国|policy|生态文明建设坚持人与自然和谐共生，贯彻绿水青山就是金山银山理念，推进降碳减污扩绿增长协同。|生态优先绿色发展；山水林田湖草沙一体化保护；资源节约集约利用；环境治理体系；积极稳妥推进碳达峰碳中和|先污染后治理不可取；生态保护与经济发展可通过转型统一；碳目标不能脱离能源和产业实际
ch_pol_xi|保障和改善民生|policy|增进民生福祉是发展的根本目的，应尽力而为量力而行，健全基本公共服务体系，解决就业教育医疗社保住房养老等问题。|就业是最基本民生；收入分配制度；社会保障安全网；公共服务均等化；共同富裕是长期过程|福利承诺不能脱离发展水平；共同富裕不等于同时同步同等富裕；民生建设既补短板也建机制
ch_pol_xi|全面从严治党与自我革命|policy|全面从严治党是新时代党的建设鲜明主题，自我革命是党跳出治乱兴衰历史周期率的重要答案。|政治建设统领；思想建设基础；组织体系严密；作风纪律建设；反腐败斗争；制度治党依规治党|反腐败不是阶段性任务；严管与激励担当统一；党的自我监督与人民监督结合
ch_pol_xi|国防和军队现代化|policy|建设巩固国防和强大人民军队是现代化建设战略任务，坚持党对人民军队绝对领导，推进政治建军、改革强军、科技强军、人才强军、依法治军。|党指挥枪是根本原则；战斗力是唯一根本标准；机械化信息化智能化融合；军民融合发展；国防建设与经济建设协调|现代化不能只理解为武器更新；改革、科技、人才和制度共同决定战斗力
ch_pol_hist_old|近代中国反侵略斗争失败原因|history|近代反侵略斗争失败根本原因是社会制度腐败，重要原因是经济技术落后；落后要挨打，但制度腐败使落后状态难以改变并削弱动员能力。|统治集团妥协退让；国家组织能力不足；经济技术基础薄弱；人民斗争显示民族意识觉醒；失败教训推动寻找新道路|不能把失败只归因武器落后；人民反抗与政府妥协要区分；反侵略斗争具有历史正义性
ch_pol_hist_new|马克思主义在中国的传播与早期组织|history|十月革命和五四运动推动马克思主义广泛传播，先进知识分子在同各种思潮论战和工人运动结合中建立共产党早期组织。|李大钊等传播马克思主义；问题与主义论战；马克思主义与工人运动结合；早期组织为建党准备思想干部和组织条件|传播不是简单译介而是实践结合；五四前后思想转变有过程；建党条件包含阶级思想组织多方面
ch_pol_hist_new|大革命失败与土地革命兴起|history|国民革命在反帝反封建方面取得进展，但因大资产阶级叛变、党内右倾错误和缺乏独立武装领导权而失败，革命转入土地革命战争。|统一战线中必须坚持独立自主；掌握革命武装；八七会议确定土地革命和武装反抗；农村根据地道路逐步开辟|不能否定第一次国共合作历史作用；失败原因要区分客观与主观；南昌起义秋收起义井冈山相互衔接
ch_pol_hist_new|长征、遵义会议与革命转折|history|长征保存并锻炼革命力量，遵义会议集中解决当时最紧迫的军事和组织问题，事实上确立毛泽东在党中央和红军领导地位。|第五次反围剿失败背景；遵义会议独立自主解决中国革命问题；长征实现战略转移；长征精神体现理想信念和群众基础|遵义会议没有系统解决所有政治路线问题；长征不是被动逃跑而是战略转移；时间节点和意义要准确
ch_pol_hist_new|西安事变与抗日民族统一战线|history|西安事变和平解决成为时局转换枢纽，推动停止内战一致抗日；抗日民族统一战线坚持国共合作又坚持独立自主。|民族矛盾上升；和平解决符合全民族利益；统一战线具有广泛性和复杂性；抗战中坚持全面抗战路线|和平解决不等于国共矛盾消失；统一战线不等于放弃领导权；正面战场与敌后战场都作出贡献
ch_pol_hist_soc|中共八大与社会主义建设探索|history|中共八大正确分析社会主义改造完成后国内主要矛盾和主要任务，提出把工作重点转向发展生产力，是探索社会主义建设道路的重要成果。|制度确立后矛盾任务变化；综合平衡和改善管理；探索取得成果也经历曲折；应区分正确理论成果与后来实践偏差|不能用后来曲折否定八大判断；主要矛盾表述要放在当时历史条件；探索经验具有长期价值
ch_pol_hist_soc|十一届三中全会与历史转折|history|十一届三中全会重新确立解放思想实事求是思想路线，把工作中心转向社会主义现代化建设并作出改革开放决策。|思想路线拨乱反正；政治路线转变；组织路线调整；改革从农村起步并向城市展开；对外开放形成格局|转折不是一天完成而是历史过程；改革开放是社会主义制度自我完善；不能割裂前后历史时期
ch_pol_hist_soc|南方谈话与社会主义市场经济方向|history|南方谈话回答长期束缚思想的重大问题，强调计划和市场都是经济手段、发展才是硬道理，推动改革开放和现代化进入新阶段。|姓资姓社判断看三个有利于；市场不等于资本主义；抓住机遇加快发展；党的十四大明确社会主义市场经济体制目标|不能把市场经济等同资本主义；发展速度要与效益质量统一；历史事件与制度决策的时间关系要准确
ch_pol_thought|人生目的、态度与价值|ethics|人生目的是人生观核心，决定人生道路和行为选择；人生态度影响面对顺逆得失的方式，人生价值包括自我价值和社会价值并以社会价值为基础。|服务人民奉献社会；积极进取与理性务实；能力贡献与责任统一；评价价值既看动机也看效果；个人发展与社会进步统一|成功不能只以财富地位衡量；自我价值不等于自我中心；社会贡献也要尊重正当个人需要
ch_pol_thought|个人理想与社会理想|ethics|个人理想体现个体发展追求，社会理想反映共同奋斗目标；社会理想规定个人理想方向，个人理想实践丰富社会理想。|理想具有超越性实践性时代性；共同理想与远大理想衔接；职业选择应联系国家社会需要；理想实现依靠长期行动|个人理想不能脱离社会条件；社会理想不是压抑个性；把愿望当理想会忽视实践路径
ch_pol_thought|爱国主义与改革创新|ethics|爱国主义是对祖国深厚感情和责任担当的统一，新时代爱国主义与爱社会主义、拥护祖国统一相一致，并以理性行动和改革创新体现。|维护统一和民族团结；尊重历史文化；服务现代化建设；开放包容不等于民族虚无；创新创造是时代要求|爱国不是排外；网络情绪不能代替理性行动；传统继承要经过创造性转化创新性发展
ch_pol_thought|集体主义道德原则|ethics|集体主义强调国家、集体和个人利益根本一致，在利益冲突时以集体利益为重，同时保障个人正当利益并重视个体发展。|反对极端个人主义；不是否定个人利益；层次包括无私奉献先公后私和顾全大局；制度应协调利益关系|把集体主义等同牺牲一切个人利益；把个人正当诉求视为自私；口号化而缺乏公共责任实践
ch_pol_law|法律制定、执行、适用与遵守|law|法律运行包括科学立法、严格执法、公正司法和全民守法，各环节相互衔接，共同维护规范权威和权利秩序。|立法体现人民意志并符合实际；行政机关依法履职；司法机关独立公正行使职权；公民组织自觉守法并依法维权|执法不等于司法；有法不代表自然实现法治；实体正义与程序正义不可偏废
ch_pol_law|宪法基本权利与义务|law|宪法确认公民平等、政治、宗教信仰、人身、社会经济文化等基本权利，同时规定维护统一、遵守法律、依法纳税等基本义务。|权利具有边界；行使权利不得损害国家社会集体和他人合法权利；权利义务相统一；国家负有尊重保障义务|自由不等于不受限制；只强调权利不履行义务；普通法律规定不得与宪法相抵触
ch_pol_law|法治思维与程序正义|law|法治思维要求以法律规范、权利义务、权限程序和责任后果分析问题；程序正义通过公开参与回避救济等机制限制权力并保障实体结果可信。|职权法定；权利保障；公平正义；权力制约；正当程序；违法承担责任|结果正确不能弥补严重程序违法；程序不是形式负担；依法维权应使用法定渠道并保存证据
"""


def parse_rows(raw: str):
    rows = []
    for line in raw.strip().splitlines():
        parts = [x.strip() for x in line.split("|")]
        if len(parts) == 6:
            chapter, title, kind, core, rules, examples = parts
            rule_parts = rules.split("?")
            mistakes = f"\u628a\u201c{title}\u201d\u53ea\u5199\u6210\u53e3\u53f7\u800c\u4e0d\u8bf4\u660e\u6210\u7acb\u6761\u4ef6\uff1b\u53ea\u80cc\u201c{rule_parts[0]}\u201d\u800c\u4e0d\u5efa\u7acb\u56e0\u679c\u94fe\uff1b\u6750\u6599\u5206\u6790\u5ffd\u7565\u201c{rule_parts[-1]}\u201d\u8fd9\u4e00\u8fb9\u754c"
        elif len(parts) == 7:
            chapter, title, kind, core, rules, examples, mistakes = parts
        else:
            raise ValueError(f"bad row with {len(parts)} fields: {line[:80]}")
        rows.append({"chapter": chapter, "title": title, "kind": kind, "core": core, "rules": rules.split("；"), "examples": examples.split("；"), "mistakes": mistakes.split("；")})
    return rows


def stable_id(prefix: str, chapter: str, title: str) -> str:
    digest = hashlib.sha1(f"{chapter}|{title}".encode()).hexdigest()[:18]
    return f"{prefix}_{digest}"


def render_english(item):
    rules = item["rules"]
    examples = item["examples"]
    mistakes = item["mistakes"]
    headings = {
        "structure": ("句法定位", "成分拆解", "长难句应用"),
        "morph": ("形式系统", "搭配约束", "语境判断"),
        "verb": ("时间与情态", "谓语构造", "语篇视角"),
        "nonfinite": ("非谓语身份", "逻辑主语", "先后与主被动"),
        "clause": ("从句功能", "连接词成分", "边界识别"),
        "special": ("特殊结构", "信息焦点", "改写验证"),
    }[item["kind"]]
    content = f"""【核心规则】\n{item['core']}\n\n【{headings[0]}】\n""" + "\n".join(f"{i+1}. {x}" for i, x in enumerate(rules))
    content += f"\n\n【{headings[1]}】\n" + "\n".join(f"- {x}" for x in examples)
    content += f"\n\n【{headings[2]}】\n考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。"
    content += "\n\n【边界与反例】\n" + "\n".join(f"- {x}" for x in mistakes)
    content += "\n\n【迁移要求】\n能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。"
    key_points = "\n".join(f"{i+1}. {x}" for i, x in enumerate(rules))
    case_analysis = "\n".join(f"例{i+1}：{x}" for i, x in enumerate(examples))
    common = "\n".join(f"误区{i+1}：{x}。纠正时必须写出结构依据并给出正确改写。" for i, x in enumerate(mistakes))
    training = f"""1. 从近十年阅读或翻译真题中找出3个包含“{item['title']}”的句子，标出有限谓语、连接词、先行词或逻辑主语。\n2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。\n3. 根据以下规则各造一个正确句并写一个典型错误句：{'；'.join(rules[:3])}。\n4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。"""
    self_test = f"""1. 用不超过120字说明“{item['title']}”的定义、形式和核心语义。\n2. 在例句“{examples[0]}”中逐词说明关键成分的功能。\n3. 为什么“{mistakes[0]}”属于错误或高风险判断？\n4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。\n5. 写出一道包含干扰项的选择题并解释每个选项。"""
    answer = f"""语法分析不要套空泛模板。作答顺序固定为：①指出“{item['title']}”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。"""
    return content, key_points, case_analysis, common, training, self_test, answer


def render_politics(item):
    core, rules, examples, mistakes = item["core"], item["rules"], item["examples"], item["mistakes"]
    labels = {
        "principle": ("原理层次", "方法论", "材料映射"),
        "society": ("结构关系", "作用机制", "改革分析"),
        "economy": ("概念与公式", "运行机制", "现象解释"),
        "socialism": ("基本原则", "道路条件", "评价尺度"),
        "history": ("历史背景", "过程与转折", "意义与教训"),
        "policy": ("战略定位", "主要任务", "关系处理"),
        "ethics": ("价值依据", "行为要求", "现实边界"),
        "law": ("规范依据", "权利义务", "程序责任"),
    }[item["kind"]]
    content = f"""【核心命题】\n{core}\n\n【{labels[0]}】\n""" + "\n".join(f"{i+1}. {x}" for i, x in enumerate(rules))
    content += f"\n\n【{labels[1]}】\n必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。"
    content += f"\n\n【{labels[2]}】\n" + "\n".join(f"- {x}" for x in examples)
    content += "\n\n【易错边界】\n" + "\n".join(f"- {x}" for x in mistakes)
    content += "\n\n【材料题落点】\n先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。"
    key_points = "\n".join(f"{i+1}. {x}" for i, x in enumerate(rules))
    case_analysis = "\n".join(f"材料角度{i+1}：{x}" for i, x in enumerate(examples))
    common = "\n".join(f"误区{i+1}：{x}。纠正：回到概念层级、历史条件或因果方向重新作答。" for i, x in enumerate(mistakes))
    training = f"""1. 闭卷写出“{item['title']}”的核心命题，并把它压缩成一条不少于5环的机制链。\n2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。\n3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。\n4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。\n5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。"""
    self_test = f"""1. “{item['title']}”解决的核心问题是什么？\n2. 写出三个关键关系：{'；'.join(rules[:3])}。\n3. 材料出现哪些事实时可以调用本知识点？\n4. 以下判断为什么不完整：“{mistakes[0]}”？\n5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。"""
    answer = f"""政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“{item['title']}”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。"""
    return content, key_points, case_analysis, common, training, self_test, answer


def sql_value(value):
    if value is None:
        return "NULL"
    return "'" + str(value).replace("'", "''") + "'"


def upsert_points(conn):
    rows = [("english", x) for x in parse_rows(ENGLISH_RAW)] + [("politics", x) for x in parse_rows(POLITICS_RAW)]
    statements = ["-- Substantive politics and English knowledge upgrade"]
    chapter_orders = {r["id"]: r["m"] for r in conn.execute("SELECT chapter_id id,COALESCE(MAX(sort_order),0) m FROM knowledge_points GROUP BY chapter_id")}
    counts = {"english": 0, "politics": 0}
    for domain, item in rows:
        renderer = render_english if domain == "english" else render_politics
        content, key_points, case_analysis, common, training, self_test, answer = renderer(item)
        existing = conn.execute("SELECT id,sort_order FROM knowledge_points WHERE chapter_id=? AND title=? ORDER BY id LIMIT 1", (item["chapter"], item["title"])).fetchone()
        if existing:
            point_id, sort_order = existing
        else:
            point_id = stable_id("kp_pe", item["chapter"], item["title"])
            chapter_orders[item["chapter"]] = chapter_orders.get(item["chapter"], 0) + 1
            sort_order = chapter_orders[item["chapter"]]
        subject = "subject_english" if domain == "english" else "subject_politics"
        summary = item["core"][:260]
        tags = json.dumps(["专项精讲", "考研英语" if domain == "english" else "考研政治", item["kind"]], ensure_ascii=False)
        values = [point_id, None, subject, item["chapter"], item["title"], content, summary, "high", "high", 2, tags, "curated-politics-english-v3", sort_order, content, key_points, case_analysis, common, training, self_test, answer, f"重点检查：{item['mistakes'][0]}", f"记忆主线：{item['core'][:100]}", 3]
        cols = "id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version"
        update_cols = [x for x in cols.split(",") if x not in {"id", "owner_id", "subject_id", "chapter_id"}]
        statement = f"INSERT INTO knowledge_points ({cols}) VALUES ({','.join(sql_value(x) for x in values)}) ON CONFLICT(id) DO UPDATE SET " + ",".join(f"{col}=excluded.{col}" for col in update_cols) + ";"
        statements.append(statement)
        local_columns = [row[1] for row in conn.execute("PRAGMA table_info(knowledge_points)")]
        local_pairs = [(column, value) for column, value in zip(cols.split(","), values) if column in local_columns]
        local_cols = [pair[0] for pair in local_pairs]
        local_values = [pair[1] for pair in local_pairs]
        local_updates = [column for column in local_cols if column not in {"id", "subject_id", "chapter_id"}]
        local_sql = f"INSERT INTO knowledge_points ({','.join(local_cols)}) VALUES ({','.join('?' for _ in local_values)}) ON CONFLICT(id) DO UPDATE SET " + ",".join(f"{column}=excluded.{column}" for column in local_updates)
        conn.execute(local_sql, local_values)
        counts[domain] += 1
    (MIGRATIONS / "0020_politics_english_substantive_upgrade.sql").write_text("\n".join(statements) + "\n", encoding="utf-8")
    return counts


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", (value or "").replace("[网络]", "")).strip()


def import_vocabulary(conn):
    if not ECDICT.exists() or ECDICT.stat().st_size < 60_000_000:
        raise FileNotFoundError(f"ECDICT full CSV not found: {ECDICT}")
    existing = {}
    for row in conn.execute("SELECT id,lower(word) key FROM vocabulary WHERE user_id IS NULL ORDER BY id"):
        existing.setdefault(row[1], row[0])
    records = []
    with ECDICT.open(encoding="utf-8", newline="") as f:
        for row in csv.DictReader(f):
            tags = set((row.get("tag") or "").split())
            word = (row.get("word") or "").strip()
            if not re.fullmatch(r"[A-Za-z][A-Za-z .'-]{0,48}", word):
                continue
            key = word.lower()
            if "ky" not in tags and key not in existing:
                continue
            translation = clean_text(row.get("translation") or "")
            if not translation:
                continue
            phonetic = clean_text(row.get("phonetic") or "")
            definition = clean_text(row.get("definition") or "")
            pos = clean_text(row.get("pos") or "")
            exchange = clean_text(row.get("exchange") or "")
            pieces = [translation]
            if pos:
                pieces.append(f"词性与搭配：{pos}")
            if definition:
                pieces.append(f"英英释义：{definition}")
            if exchange:
                pieces.append(f"词形变化：{exchange}")
            meaning = "；".join(pieces)[:1800]
            category = "考研核心·基础" if {"gk", "cet4"} & tags else ("考研核心·提高" if "cet6" in tags else "考研核心·学术")
            phonetic_fallbacks = {"axe": "\u00e6ks", "cosy": "\u02c8k\u0259\u028azi", "credentials": "kr\u0259\u02c8den\u0283\u0259lz", "cyberspace": "\u02c8sa\u026ab\u0259spe\u026as", "emerging": "\u026a\u02c8m\u025c\u02d0d\u0292\u026a\u014b", "laptop": "\u02c8l\u00e6pt\u0252p", "muted": "\u02c8mju\u02d0t\u026ad"}
            phonetic = phonetic or phonetic_fallbacks.get(key, "")
            word_id = existing.get(key) or stable_id("vocab_ky", "ky", key)
            existing[key] = word_id
            records.append((word_id, word, f"/{phonetic}/" if phonetic and not phonetic.startswith("/") else phonetic, meaning, "", category))
    by_word = {}
    for record in records:
        by_word.setdefault(record[1].lower(), record)
    records = sorted(by_word.values(), key=lambda x: x[1].lower())
    migrations = []
    chunk_size = 850
    for chunk_index in range(0, len(records), chunk_size):
        number = 21 + chunk_index // chunk_size
        lines = [f"-- ECDICT MIT licensed postgraduate vocabulary chunk {number - 20}"]
        for record in records[chunk_index:chunk_index + chunk_size]:
            values = [record[0], None, record[1], record[2], record[3], record[4], record[5], "english", 0, 0, 0, None, None]
            cols = "id,user_id,word,phonetic,meaning,example,category,subject,mastery,review_count,is_custom,last_reviewed,next_review"
            lines.append(f"INSERT INTO vocabulary ({cols}) VALUES ({','.join(sql_value(x) for x in values)}) ON CONFLICT(id) DO UPDATE SET word=excluded.word,phonetic=excluded.phonetic,meaning=excluded.meaning,category=excluded.category;")
        path = MIGRATIONS / f"{number:04d}_seed_kaoyan_vocabulary_{number-20:02d}.sql"
        path.write_text("\n".join(lines) + "\n", encoding="utf-8")
        migrations.append(path)
    vocab_columns = [row[1] for row in conn.execute("PRAGMA table_info(vocabulary)")]
    for record in records:
        values_by_column = {"id": record[0], "user_id": None, "word": record[1], "phonetic": record[2], "meaning": record[3], "example": record[4], "category": record[5], "subject": "english", "mastery": 0, "review_count": 0, "is_custom": 0, "sort_order": 0}
        local_cols = [column for column in values_by_column if column in vocab_columns]
        local_values = [values_by_column[column] for column in local_cols]
        update_cols = [column for column in ("word", "phonetic", "meaning", "category") if column in local_cols]
        local_sql = f"INSERT INTO vocabulary ({','.join(local_cols)}) VALUES ({','.join('?' for _ in local_values)}) ON CONFLICT(id) DO UPDATE SET " + ",".join(f"{column}=excluded.{column}" for column in update_cols)
        conn.execute(local_sql, local_values)
    dedupe_sql = """DELETE FROM vocabulary
WHERE user_id IS NULL
  AND id IN (
    SELECT id FROM (
      SELECT id, ROW_NUMBER() OVER (PARTITION BY lower(word) ORDER BY id) AS rn
      FROM vocabulary WHERE user_id IS NULL
    ) WHERE rn > 1
  )
  AND NOT EXISTS (SELECT 1 FROM vocabulary_reviews vr WHERE vr.word_id=vocabulary.id);"""
    conn.execute(dedupe_sql)
    (MIGRATIONS / "0027_dedupe_global_vocabulary.sql").write_text("-- Safely remove unreviewed duplicate global words\n" + dedupe_sql + "\nCREATE INDEX IF NOT EXISTS idx_vocab_lower_word ON vocabulary(lower(word));\n", encoding="utf-8")
    return len(records), migrations


def main():
    MIGRATIONS.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        conn.execute("PRAGMA foreign_keys=ON")
        point_counts = upsert_points(conn)
        vocab_count, vocab_files = import_vocabulary(conn)
        conn.commit()
        totals = dict(conn.execute("SELECT subject_id,COUNT(*) FROM knowledge_points WHERE subject_id IN ('subject_politics','subject_english') GROUP BY subject_id").fetchall())
        unique_vocab = conn.execute("SELECT COUNT(DISTINCT lower(word)) FROM vocabulary WHERE user_id IS NULL").fetchone()[0]
        print(json.dumps({"upgraded_points": point_counts, "subject_totals": totals, "kaoyan_vocab_imported": vocab_count, "unique_global_vocab": unique_vocab, "vocab_migrations": [p.name for p in vocab_files]}, ensure_ascii=False, indent=2))
    finally:
        conn.close()


if __name__ == "__main__":
    main()