-- Substantive politics and English knowledge upgrade
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_0fa03eec2026665663',NULL,'subject_english','ch_eng_grammar','句子成分与词性','【核心规则】
英语句法分析先确认谓语，再判断主语、宾语、补语、定语和状语；同一个词在不同语境中可以承担不同词性和句法功能。

【句法定位】
1. 谓语是有限动词并承担时态语态
2. 宾语由及物动词或介词支配
3. 补语补足主语或宾语的身份状态
4. 定语修饰名词，状语修饰动词形容词副词或全句

【成分拆解】
- The rapid growth of cities has changed society.→主语中心词growth，谓语has changed，of cities作后置定语，rapid作前置定语
- They found the proposal practical.→proposal是宾语，practical是宾补

【长难句应用】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把介词短语误判为谓语
- 看到动词形式就当谓语
- 混淆双宾语与宾语补足语

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','英语句法分析先确认谓语，再判断主语、宾语、补语、定语和状语；同一个词在不同语境中可以承担不同词性和句法功能。','high','high','2','["专项精讲", "考研英语", "structure"]','curated-politics-english-v3','16','【核心规则】
英语句法分析先确认谓语，再判断主语、宾语、补语、定语和状语；同一个词在不同语境中可以承担不同词性和句法功能。

【句法定位】
1. 谓语是有限动词并承担时态语态
2. 宾语由及物动词或介词支配
3. 补语补足主语或宾语的身份状态
4. 定语修饰名词，状语修饰动词形容词副词或全句

【成分拆解】
- The rapid growth of cities has changed society.→主语中心词growth，谓语has changed，of cities作后置定语，rapid作前置定语
- They found the proposal practical.→proposal是宾语，practical是宾补

【长难句应用】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把介词短语误判为谓语
- 看到动词形式就当谓语
- 混淆双宾语与宾语补足语

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 谓语是有限动词并承担时态语态
2. 宾语由及物动词或介词支配
3. 补语补足主语或宾语的身份状态
4. 定语修饰名词，状语修饰动词形容词副词或全句','例1：The rapid growth of cities has changed society.→主语中心词growth，谓语has changed，of cities作后置定语，rapid作前置定语
例2：They found the proposal practical.→proposal是宾语，practical是宾补','误区1：把介词短语误判为谓语。纠正时必须写出结构依据并给出正确改写。
误区2：看到动词形式就当谓语。纠正时必须写出结构依据并给出正确改写。
误区3：混淆双宾语与宾语补足语。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“句子成分与词性”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：谓语是有限动词并承担时态语态；宾语由及物动词或介词支配；补语补足主语或宾语的身份状态。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“句子成分与词性”的定义、形式和核心语义。
2. 在例句“The rapid growth of cities has changed society.→主语中心词growth，谓语has changed，of cities作后置定语，rapid作前置定语”中逐词说明关键成分的功能。
3. 为什么“把介词短语误判为谓语”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“句子成分与词性”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：把介词短语误判为谓语','记忆主线：英语句法分析先确认谓语，再判断主语、宾语、补语、定语和状语；同一个词在不同语境中可以承担不同词性和句法功能。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_e3f74491e42026694e',NULL,'subject_english','ch_eng_grammar','名词的数、格与一致','【核心规则】
可数名词必须处理单复数，不可数名词不能随意加复数；名词所有格和of结构表达所属、来源、类别或部分整体关系。

【形式系统】
1. 规则复数与不规则复数
2. 集合名词按整体或成员决定一致
3. 抽象名词物质名词可在语境中可数化
4. 双重所有格表示部分关系

【搭配约束】
- The committee has reached its decision.→committee视为整体
- Two pieces of evidence were omitted.→evidence不可数，借助piece量化

【语境判断】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- information/evidence/research随意加s
- people与persons不分语境
- the students''与the student''s混淆

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','可数名词必须处理单复数，不可数名词不能随意加复数；名词所有格和of结构表达所属、来源、类别或部分整体关系。','high','high','2','["专项精讲", "考研英语", "morph"]','curated-politics-english-v3','17','【核心规则】
可数名词必须处理单复数，不可数名词不能随意加复数；名词所有格和of结构表达所属、来源、类别或部分整体关系。

【形式系统】
1. 规则复数与不规则复数
2. 集合名词按整体或成员决定一致
3. 抽象名词物质名词可在语境中可数化
4. 双重所有格表示部分关系

【搭配约束】
- The committee has reached its decision.→committee视为整体
- Two pieces of evidence were omitted.→evidence不可数，借助piece量化

【语境判断】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- information/evidence/research随意加s
- people与persons不分语境
- the students''与the student''s混淆

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 规则复数与不规则复数
2. 集合名词按整体或成员决定一致
3. 抽象名词物质名词可在语境中可数化
4. 双重所有格表示部分关系','例1：The committee has reached its decision.→committee视为整体
例2：Two pieces of evidence were omitted.→evidence不可数，借助piece量化','误区1：information/evidence/research随意加s。纠正时必须写出结构依据并给出正确改写。
误区2：people与persons不分语境。纠正时必须写出结构依据并给出正确改写。
误区3：the students''与the student''s混淆。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“名词的数、格与一致”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：规则复数与不规则复数；集合名词按整体或成员决定一致；抽象名词物质名词可在语境中可数化。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“名词的数、格与一致”的定义、形式和核心语义。
2. 在例句“The committee has reached its decision.→committee视为整体”中逐词说明关键成分的功能。
3. 为什么“information/evidence/research随意加s”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“名词的数、格与一致”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：information/evidence/research随意加s','记忆主线：可数名词必须处理单复数，不可数名词不能随意加复数；名词所有格和of结构表达所属、来源、类别或部分整体关系。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_d2ff1033f80a5048e2',NULL,'subject_english','ch_eng_grammar','冠词与零冠词','【核心规则】
a/an表示类别中的一个或首次提及，the表示双方可识别、前文已提及或具有唯一性，零冠词常用于复数或不可数名词的泛指。

【形式系统】
1. a/an由读音而非字母决定
2. the可由后置修饰语限定
3. 专有名词、学科、语言和三餐通常零冠词
4. 乐器、序数词和最高级常用the

【搭配约束】
- Education is a public good.→抽象概念泛指用零冠词
- The education offered by the program is practical.→后置定语限定后用the

【语境判断】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 按中文“一个”机械加a
- 泛指复数前加the
- 忽略元音音素导致a hour

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','a/an表示类别中的一个或首次提及，the表示双方可识别、前文已提及或具有唯一性，零冠词常用于复数或不可数名词的泛指。','high','high','2','["专项精讲", "考研英语", "morph"]','curated-politics-english-v3','18','【核心规则】
a/an表示类别中的一个或首次提及，the表示双方可识别、前文已提及或具有唯一性，零冠词常用于复数或不可数名词的泛指。

【形式系统】
1. a/an由读音而非字母决定
2. the可由后置修饰语限定
3. 专有名词、学科、语言和三餐通常零冠词
4. 乐器、序数词和最高级常用the

【搭配约束】
- Education is a public good.→抽象概念泛指用零冠词
- The education offered by the program is practical.→后置定语限定后用the

【语境判断】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 按中文“一个”机械加a
- 泛指复数前加the
- 忽略元音音素导致a hour

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. a/an由读音而非字母决定
2. the可由后置修饰语限定
3. 专有名词、学科、语言和三餐通常零冠词
4. 乐器、序数词和最高级常用the','例1：Education is a public good.→抽象概念泛指用零冠词
例2：The education offered by the program is practical.→后置定语限定后用the','误区1：按中文“一个”机械加a。纠正时必须写出结构依据并给出正确改写。
误区2：泛指复数前加the。纠正时必须写出结构依据并给出正确改写。
误区3：忽略元音音素导致a hour。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“冠词与零冠词”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：a/an由读音而非字母决定；the可由后置修饰语限定；专有名词、学科、语言和三餐通常零冠词。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“冠词与零冠词”的定义、形式和核心语义。
2. 在例句“Education is a public good.→抽象概念泛指用零冠词”中逐词说明关键成分的功能。
3. 为什么“按中文“一个”机械加a”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“冠词与零冠词”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：按中文“一个”机械加a','记忆主线：a/an表示类别中的一个或首次提及，the表示双方可识别、前文已提及或具有唯一性，零冠词常用于复数或不可数名词的泛指。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_4bf5e26482d459ae6e',NULL,'subject_english','ch_eng_grammar','代词、指代与一致','【核心规则】
代词必须在数、性、人称和语义上与先行词一致；阅读与翻译中要根据最近合理先行词、语义角色和篇章主题共同还原指代。

【形式系统】
1. it可指物、形式主语宾语或前述事实
2. they可回指复数名词或泛指人群
3. this/that可概括前句命题
4. one/ones替代同类名词

【搭配约束】
- Many policies fail because they ignore local conditions.→they回指policies
- It is difficult to measure trust.→it为形式主语

【语境判断】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 只按距离确定先行词
- 把形式it翻译成“它”
- one与it混用

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','代词必须在数、性、人称和语义上与先行词一致；阅读与翻译中要根据最近合理先行词、语义角色和篇章主题共同还原指代。','high','high','2','["专项精讲", "考研英语", "morph"]','curated-politics-english-v3','19','【核心规则】
代词必须在数、性、人称和语义上与先行词一致；阅读与翻译中要根据最近合理先行词、语义角色和篇章主题共同还原指代。

【形式系统】
1. it可指物、形式主语宾语或前述事实
2. they可回指复数名词或泛指人群
3. this/that可概括前句命题
4. one/ones替代同类名词

【搭配约束】
- Many policies fail because they ignore local conditions.→they回指policies
- It is difficult to measure trust.→it为形式主语

【语境判断】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 只按距离确定先行词
- 把形式it翻译成“它”
- one与it混用

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. it可指物、形式主语宾语或前述事实
2. they可回指复数名词或泛指人群
3. this/that可概括前句命题
4. one/ones替代同类名词','例1：Many policies fail because they ignore local conditions.→they回指policies
例2：It is difficult to measure trust.→it为形式主语','误区1：只按距离确定先行词。纠正时必须写出结构依据并给出正确改写。
误区2：把形式it翻译成“它”。纠正时必须写出结构依据并给出正确改写。
误区3：one与it混用。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“代词、指代与一致”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：it可指物、形式主语宾语或前述事实；they可回指复数名词或泛指人群；this/that可概括前句命题。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“代词、指代与一致”的定义、形式和核心语义。
2. 在例句“Many policies fail because they ignore local conditions.→they回指policies”中逐词说明关键成分的功能。
3. 为什么“只按距离确定先行词”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“代词、指代与一致”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：只按距离确定先行词','记忆主线：代词必须在数、性、人称和语义上与先行词一致；阅读与翻译中要根据最近合理先行词、语义角色和篇章主题共同还原指代。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_ddfc085af6ed9822a5',NULL,'subject_english','ch_eng_grammar','限定词、数量词与部分结构','【核心规则】
限定词决定名词的指称范围；all/both/either/neither/each/every/many/much/few/little等必须与可数性、单复数和语义范围匹配。

【形式系统】
1. each/every后接单数但强调整体方式不同
2. few/little含否定，a few/a little含肯定
3. either指两者之一，any可指三者以上
4. 数量词可与of结构构成部分关系

【搭配约束】
- Each participant was interviewed.→each要求单数谓语
- A few studies provide convincing evidence.→表示存在少量有效研究

【语境判断】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- every后接复数
- much students
- both of后遗漏限定词

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','限定词决定名词的指称范围；all/both/either/neither/each/every/many/much/few/little等必须与可数性、单复数和语义范围匹配。','high','high','2','["专项精讲", "考研英语", "morph"]','curated-politics-english-v3','20','【核心规则】
限定词决定名词的指称范围；all/both/either/neither/each/every/many/much/few/little等必须与可数性、单复数和语义范围匹配。

【形式系统】
1. each/every后接单数但强调整体方式不同
2. few/little含否定，a few/a little含肯定
3. either指两者之一，any可指三者以上
4. 数量词可与of结构构成部分关系

【搭配约束】
- Each participant was interviewed.→each要求单数谓语
- A few studies provide convincing evidence.→表示存在少量有效研究

【语境判断】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- every后接复数
- much students
- both of后遗漏限定词

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. each/every后接单数但强调整体方式不同
2. few/little含否定，a few/a little含肯定
3. either指两者之一，any可指三者以上
4. 数量词可与of结构构成部分关系','例1：Each participant was interviewed.→each要求单数谓语
例2：A few studies provide convincing evidence.→表示存在少量有效研究','误区1：every后接复数。纠正时必须写出结构依据并给出正确改写。
误区2：much students。纠正时必须写出结构依据并给出正确改写。
误区3：both of后遗漏限定词。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“限定词、数量词与部分结构”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：each/every后接单数但强调整体方式不同；few/little含否定，a few/a little含肯定；either指两者之一，any可指三者以上。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“限定词、数量词与部分结构”的定义、形式和核心语义。
2. 在例句“Each participant was interviewed.→each要求单数谓语”中逐词说明关键成分的功能。
3. 为什么“every后接复数”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“限定词、数量词与部分结构”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：every后接复数','记忆主线：限定词决定名词的指称范围；all/both/either/neither/each/every/many/much/few/little等必须与可数性、单复数和语义范围匹配。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_3211f9e7830aa5a6b1',NULL,'subject_english','ch_eng_grammar','主谓一致','【核心规则】
谓语与语法主语在人称和数上保持一致，但就近一致、意义一致和插入成分会干扰判断。

【时间与情态】
1. 介词短语不改变主语中心词
2. either...or/neither...nor常按就近原则
3. a number of接复数，the number of接单数
4. 时间金钱距离作整体可用单数

【谓语构造】
- The quality of the reports is uneven.→主语中心词quality
- A number of students are applying, but the number is falling.→两个number结构规则不同

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 被of后的复数名词诱导
- 把news当复数
- there be不看后置主语

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','谓语与语法主语在人称和数上保持一致，但就近一致、意义一致和插入成分会干扰判断。','high','high','2','["专项精讲", "考研英语", "verb"]','curated-politics-english-v3','21','【核心规则】
谓语与语法主语在人称和数上保持一致，但就近一致、意义一致和插入成分会干扰判断。

【时间与情态】
1. 介词短语不改变主语中心词
2. either...or/neither...nor常按就近原则
3. a number of接复数，the number of接单数
4. 时间金钱距离作整体可用单数

【谓语构造】
- The quality of the reports is uneven.→主语中心词quality
- A number of students are applying, but the number is falling.→两个number结构规则不同

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 被of后的复数名词诱导
- 把news当复数
- there be不看后置主语

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 介词短语不改变主语中心词
2. either...or/neither...nor常按就近原则
3. a number of接复数，the number of接单数
4. 时间金钱距离作整体可用单数','例1：The quality of the reports is uneven.→主语中心词quality
例2：A number of students are applying, but the number is falling.→两个number结构规则不同','误区1：被of后的复数名词诱导。纠正时必须写出结构依据并给出正确改写。
误区2：把news当复数。纠正时必须写出结构依据并给出正确改写。
误区3：there be不看后置主语。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“主谓一致”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：介词短语不改变主语中心词；either...or/neither...nor常按就近原则；a number of接复数，the number of接单数。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“主谓一致”的定义、形式和核心语义。
2. 在例句“The quality of the reports is uneven.→主语中心词quality”中逐词说明关键成分的功能。
3. 为什么“被of后的复数名词诱导”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“主谓一致”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：被of后的复数名词诱导','记忆主线：谓语与语法主语在人称和数上保持一致，但就近一致、意义一致和插入成分会干扰判断。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_ecb211a58963165444',NULL,'subject_english','ch_eng_grammar','一般时态','【核心规则】
一般时描述习惯、规律、稳定状态、叙事事实或在特定时间完成的过去事件，时态选择必须服从时间定位与语篇视角。

【时间与情态】
1. 一般现在时用于客观规律和常态
2. 一般过去时用于与现在切断的过去事件
3. 一般将来时表达预测意愿安排
4. 时间条件从句常用现在时表将来

【谓语构造】
- Research shows that trust matters.→论文陈述常用一般现在时
- The survey was conducted in 2024.→明确过去时间用一般过去时

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 有since仍用一般过去时
- 条件从句写will
- 历史事实与作者当前观点时态混写

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','一般时描述习惯、规律、稳定状态、叙事事实或在特定时间完成的过去事件，时态选择必须服从时间定位与语篇视角。','high','high','2','["专项精讲", "考研英语", "verb"]','curated-politics-english-v3','22','【核心规则】
一般时描述习惯、规律、稳定状态、叙事事实或在特定时间完成的过去事件，时态选择必须服从时间定位与语篇视角。

【时间与情态】
1. 一般现在时用于客观规律和常态
2. 一般过去时用于与现在切断的过去事件
3. 一般将来时表达预测意愿安排
4. 时间条件从句常用现在时表将来

【谓语构造】
- Research shows that trust matters.→论文陈述常用一般现在时
- The survey was conducted in 2024.→明确过去时间用一般过去时

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 有since仍用一般过去时
- 条件从句写will
- 历史事实与作者当前观点时态混写

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 一般现在时用于客观规律和常态
2. 一般过去时用于与现在切断的过去事件
3. 一般将来时表达预测意愿安排
4. 时间条件从句常用现在时表将来','例1：Research shows that trust matters.→论文陈述常用一般现在时
例2：The survey was conducted in 2024.→明确过去时间用一般过去时','误区1：有since仍用一般过去时。纠正时必须写出结构依据并给出正确改写。
误区2：条件从句写will。纠正时必须写出结构依据并给出正确改写。
误区3：历史事实与作者当前观点时态混写。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“一般时态”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：一般现在时用于客观规律和常态；一般过去时用于与现在切断的过去事件；一般将来时表达预测意愿安排。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“一般时态”的定义、形式和核心语义。
2. 在例句“Research shows that trust matters.→论文陈述常用一般现在时”中逐词说明关键成分的功能。
3. 为什么“有since仍用一般过去时”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“一般时态”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：有since仍用一般过去时','记忆主线：一般时描述习惯、规律、稳定状态、叙事事实或在特定时间完成的过去事件，时态选择必须服从时间定位与语篇视角。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_1e68566ecf614f063f',NULL,'subject_english','ch_eng_grammar','进行时态','【核心规则】
进行体把动作呈现为某一参照时点正在展开、暂时持续或逐渐变化的过程，并可表达近期安排或带感情色彩的反复。

【时间与情态】
1. be doing是基本结构
2. 状态动词通常不用进行体
3. 进行体可突出变化趋势
4. 过去进行时常提供背景

【谓语构造】
- Digital platforms are reshaping public debate.→强调持续变化
- She was reading when the call arrived.→进行动作与突发事件形成背景

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- know/belong等状态动词滥用进行体
- 把进行时等同“正在”而忽略趋势与临时性

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','进行体把动作呈现为某一参照时点正在展开、暂时持续或逐渐变化的过程，并可表达近期安排或带感情色彩的反复。','high','high','2','["专项精讲", "考研英语", "verb"]','curated-politics-english-v3','23','【核心规则】
进行体把动作呈现为某一参照时点正在展开、暂时持续或逐渐变化的过程，并可表达近期安排或带感情色彩的反复。

【时间与情态】
1. be doing是基本结构
2. 状态动词通常不用进行体
3. 进行体可突出变化趋势
4. 过去进行时常提供背景

【谓语构造】
- Digital platforms are reshaping public debate.→强调持续变化
- She was reading when the call arrived.→进行动作与突发事件形成背景

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- know/belong等状态动词滥用进行体
- 把进行时等同“正在”而忽略趋势与临时性

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. be doing是基本结构
2. 状态动词通常不用进行体
3. 进行体可突出变化趋势
4. 过去进行时常提供背景','例1：Digital platforms are reshaping public debate.→强调持续变化
例2：She was reading when the call arrived.→进行动作与突发事件形成背景','误区1：know/belong等状态动词滥用进行体。纠正时必须写出结构依据并给出正确改写。
误区2：把进行时等同“正在”而忽略趋势与临时性。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“进行时态”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：be doing是基本结构；状态动词通常不用进行体；进行体可突出变化趋势。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“进行时态”的定义、形式和核心语义。
2. 在例句“Digital platforms are reshaping public debate.→强调持续变化”中逐词说明关键成分的功能。
3. 为什么“know/belong等状态动词滥用进行体”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“进行时态”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：know/belong等状态动词滥用进行体','记忆主线：进行体把动作呈现为某一参照时点正在展开、暂时持续或逐渐变化的过程，并可表达近期安排或带感情色彩的反复。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_98a3d6dfb61e935877',NULL,'subject_english','ch_eng_grammar','完成时态','【核心规则】
完成体连接两个时间层：动作发生在参照点之前，但结果、经验或持续状态与参照点有关。

【时间与情态】
1. 现在完成时连接过去与现在
2. 过去完成时表示过去的过去
3. since接起点，for接时段
4. 瞬间动词与持续时间连用时需改为状态表达

【谓语构造】
- The policy has influenced later reforms.→过去影响延续到现在
- By 2020, researchers had collected enough data.→过去参照点之前完成

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 与明确过去时间yesterday连用现在完成时
- had done没有过去参照点
- since与for混用

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','完成体连接两个时间层：动作发生在参照点之前，但结果、经验或持续状态与参照点有关。','high','high','2','["专项精讲", "考研英语", "verb"]','curated-politics-english-v3','24','【核心规则】
完成体连接两个时间层：动作发生在参照点之前，但结果、经验或持续状态与参照点有关。

【时间与情态】
1. 现在完成时连接过去与现在
2. 过去完成时表示过去的过去
3. since接起点，for接时段
4. 瞬间动词与持续时间连用时需改为状态表达

【谓语构造】
- The policy has influenced later reforms.→过去影响延续到现在
- By 2020, researchers had collected enough data.→过去参照点之前完成

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 与明确过去时间yesterday连用现在完成时
- had done没有过去参照点
- since与for混用

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 现在完成时连接过去与现在
2. 过去完成时表示过去的过去
3. since接起点，for接时段
4. 瞬间动词与持续时间连用时需改为状态表达','例1：The policy has influenced later reforms.→过去影响延续到现在
例2：By 2020, researchers had collected enough data.→过去参照点之前完成','误区1：与明确过去时间yesterday连用现在完成时。纠正时必须写出结构依据并给出正确改写。
误区2：had done没有过去参照点。纠正时必须写出结构依据并给出正确改写。
误区3：since与for混用。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“完成时态”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：现在完成时连接过去与现在；过去完成时表示过去的过去；since接起点，for接时段。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“完成时态”的定义、形式和核心语义。
2. 在例句“The policy has influenced later reforms.→过去影响延续到现在”中逐词说明关键成分的功能。
3. 为什么“与明确过去时间yesterday连用现在完成时”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“完成时态”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：与明确过去时间yesterday连用现在完成时','记忆主线：完成体连接两个时间层：动作发生在参照点之前，但结果、经验或持续状态与参照点有关。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_71dba3f4538b1947a5',NULL,'subject_english','ch_eng_grammar','完成进行时','【核心规则】
完成进行体强调动作从过去开始持续到参照点，突出过程、反复或可观察结果，与完成时的结果焦点不同。

【时间与情态】
1. have been doing连接过去与现在
2. had been doing连接过去两个时点
3. 适合持续活动而非瞬间动作
4. 结果明显时可解释当前状态

【谓语构造】
- Researchers have been debating the issue for decades.→突出持续过程
- The ground was wet because it had been raining.→过程解释过去结果

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 所有持续动作都机械使用完成进行时
- 忽略状态动词限制
- 与完成时意义不加区分

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','完成进行体强调动作从过去开始持续到参照点，突出过程、反复或可观察结果，与完成时的结果焦点不同。','high','high','2','["专项精讲", "考研英语", "verb"]','curated-politics-english-v3','25','【核心规则】
完成进行体强调动作从过去开始持续到参照点，突出过程、反复或可观察结果，与完成时的结果焦点不同。

【时间与情态】
1. have been doing连接过去与现在
2. had been doing连接过去两个时点
3. 适合持续活动而非瞬间动作
4. 结果明显时可解释当前状态

【谓语构造】
- Researchers have been debating the issue for decades.→突出持续过程
- The ground was wet because it had been raining.→过程解释过去结果

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 所有持续动作都机械使用完成进行时
- 忽略状态动词限制
- 与完成时意义不加区分

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. have been doing连接过去与现在
2. had been doing连接过去两个时点
3. 适合持续活动而非瞬间动作
4. 结果明显时可解释当前状态','例1：Researchers have been debating the issue for decades.→突出持续过程
例2：The ground was wet because it had been raining.→过程解释过去结果','误区1：所有持续动作都机械使用完成进行时。纠正时必须写出结构依据并给出正确改写。
误区2：忽略状态动词限制。纠正时必须写出结构依据并给出正确改写。
误区3：与完成时意义不加区分。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“完成进行时”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：have been doing连接过去与现在；had been doing连接过去两个时点；适合持续活动而非瞬间动作。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“完成进行时”的定义、形式和核心语义。
2. 在例句“Researchers have been debating the issue for decades.→突出持续过程”中逐词说明关键成分的功能。
3. 为什么“所有持续动作都机械使用完成进行时”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“完成进行时”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：所有持续动作都机械使用完成进行时','记忆主线：完成进行体强调动作从过去开始持续到参照点，突出过程、反复或可观察结果，与完成时的结果焦点不同。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_66405ba75059b7f47d',NULL,'subject_english','ch_eng_grammar','情态动词','【核心规则】
情态动词表达能力、许可、义务、推测、意愿或委婉态度，后接动词原形且不随人称变化。

【时间与情态】
1. must表示强义务或高把握推测
2. have to偏客观必要
3. may/might表示可能
4. should可表示义务或按理推测
5. 情态动词+have done表示对过去判断

【谓语构造】
- The result may reflect sampling bias.→谨慎推测
- The rule must be followed.→强义务

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- mustn''t与needn''t混淆
- 情态动词后加to
- may have done与should have done含义混淆

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','情态动词表达能力、许可、义务、推测、意愿或委婉态度，后接动词原形且不随人称变化。','high','high','2','["专项精讲", "考研英语", "verb"]','curated-politics-english-v3','26','【核心规则】
情态动词表达能力、许可、义务、推测、意愿或委婉态度，后接动词原形且不随人称变化。

【时间与情态】
1. must表示强义务或高把握推测
2. have to偏客观必要
3. may/might表示可能
4. should可表示义务或按理推测
5. 情态动词+have done表示对过去判断

【谓语构造】
- The result may reflect sampling bias.→谨慎推测
- The rule must be followed.→强义务

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- mustn''t与needn''t混淆
- 情态动词后加to
- may have done与should have done含义混淆

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. must表示强义务或高把握推测
2. have to偏客观必要
3. may/might表示可能
4. should可表示义务或按理推测
5. 情态动词+have done表示对过去判断','例1：The result may reflect sampling bias.→谨慎推测
例2：The rule must be followed.→强义务','误区1：mustn''t与needn''t混淆。纠正时必须写出结构依据并给出正确改写。
误区2：情态动词后加to。纠正时必须写出结构依据并给出正确改写。
误区3：may have done与should have done含义混淆。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“情态动词”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：must表示强义务或高把握推测；have to偏客观必要；may/might表示可能。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“情态动词”的定义、形式和核心语义。
2. 在例句“The result may reflect sampling bias.→谨慎推测”中逐词说明关键成分的功能。
3. 为什么“mustn''t与needn''t混淆”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“情态动词”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：mustn''t与needn''t混淆','记忆主线：情态动词表达能力、许可、义务、推测、意愿或委婉态度，后接动词原形且不随人称变化。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_4c227dcada5673dd01',NULL,'subject_english','ch_eng_grammar','助动词、否定与疑问','【核心规则】
be、do、have既可作实义动词也可作助动词；否定、疑问、强调和替代结构依靠助动词完成。

【时间与情态】
1. 一般时无其他助动词时用do
2. 完成体用have
3. 进行体和被动用be
4. 助动词后动词形式由结构决定
5. do可加强肯定语气

【谓语构造】
- Why did the policy fail?→did承担疑问和过去时，fail用原形
- The evidence does support the claim.→does表示强调

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- did后仍用过去式
- have与have got混写
- 否定词位置错误

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','be、do、have既可作实义动词也可作助动词；否定、疑问、强调和替代结构依靠助动词完成。','high','high','2','["专项精讲", "考研英语", "verb"]','curated-politics-english-v3','27','【核心规则】
be、do、have既可作实义动词也可作助动词；否定、疑问、强调和替代结构依靠助动词完成。

【时间与情态】
1. 一般时无其他助动词时用do
2. 完成体用have
3. 进行体和被动用be
4. 助动词后动词形式由结构决定
5. do可加强肯定语气

【谓语构造】
- Why did the policy fail?→did承担疑问和过去时，fail用原形
- The evidence does support the claim.→does表示强调

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- did后仍用过去式
- have与have got混写
- 否定词位置错误

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 一般时无其他助动词时用do
2. 完成体用have
3. 进行体和被动用be
4. 助动词后动词形式由结构决定
5. do可加强肯定语气','例1：Why did the policy fail?→did承担疑问和过去时，fail用原形
例2：The evidence does support the claim.→does表示强调','误区1：did后仍用过去式。纠正时必须写出结构依据并给出正确改写。
误区2：have与have got混写。纠正时必须写出结构依据并给出正确改写。
误区3：否定词位置错误。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“助动词、否定与疑问”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：一般时无其他助动词时用do；完成体用have；进行体和被动用be。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“助动词、否定与疑问”的定义、形式和核心语义。
2. 在例句“Why did the policy fail?→did承担疑问和过去时，fail用原形”中逐词说明关键成分的功能。
3. 为什么“did后仍用过去式”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“助动词、否定与疑问”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：did后仍用过去式','记忆主线：be、do、have既可作实义动词也可作助动词；否定、疑问、强调和替代结构依靠助动词完成。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_6986f5dc3a31de33a6',NULL,'subject_english','ch_eng_grammar','被动语态的完整系统','【核心规则】
被动语态用be/get+过去分词突出承受者、过程或结果；能否被动取决于动词是否支配宾语以及语义是否允许。

【时间与情态】
1. 各时态的被动由be承担时态
2. 情态被动为modal+be done
3. 短语动词变被动不能丢介词
4. get被动更口语且常含意外变化
5. by短语只在施事重要时保留

【谓语构造】
- The proposal has been widely discussed.→现在完成时被动
- The problem must be dealt with.→短语动词介词保留

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 只见be+done就判被动而忽略系表结构
- 遗漏介词
- 不及物动词强行变被动

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','被动语态用be/get+过去分词突出承受者、过程或结果；能否被动取决于动词是否支配宾语以及语义是否允许。','high','high','2','["专项精讲", "考研英语", "verb"]','curated-politics-english-v3','28','【核心规则】
被动语态用be/get+过去分词突出承受者、过程或结果；能否被动取决于动词是否支配宾语以及语义是否允许。

【时间与情态】
1. 各时态的被动由be承担时态
2. 情态被动为modal+be done
3. 短语动词变被动不能丢介词
4. get被动更口语且常含意外变化
5. by短语只在施事重要时保留

【谓语构造】
- The proposal has been widely discussed.→现在完成时被动
- The problem must be dealt with.→短语动词介词保留

【语篇视角】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 只见be+done就判被动而忽略系表结构
- 遗漏介词
- 不及物动词强行变被动

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 各时态的被动由be承担时态
2. 情态被动为modal+be done
3. 短语动词变被动不能丢介词
4. get被动更口语且常含意外变化
5. by短语只在施事重要时保留','例1：The proposal has been widely discussed.→现在完成时被动
例2：The problem must be dealt with.→短语动词介词保留','误区1：只见be+done就判被动而忽略系表结构。纠正时必须写出结构依据并给出正确改写。
误区2：遗漏介词。纠正时必须写出结构依据并给出正确改写。
误区3：不及物动词强行变被动。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“被动语态的完整系统”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：各时态的被动由be承担时态；情态被动为modal+be done；短语动词变被动不能丢介词。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“被动语态的完整系统”的定义、形式和核心语义。
2. 在例句“The proposal has been widely discussed.→现在完成时被动”中逐词说明关键成分的功能。
3. 为什么“只见be+done就判被动而忽略系表结构”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“被动语态的完整系统”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：只见be+done就判被动而忽略系表结构','记忆主线：被动语态用be/get+过去分词突出承受者、过程或结果；能否被动取决于动词是否支配宾语以及语义是否允许。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_4d66bf664776364540',NULL,'subject_english','ch_eng_grammar','不定式','【核心规则】
不定式可作主语、宾语、表语、定语、状语和补语，常表达目的、将来倾向或具体一次性动作。

【非谓语身份】
1. to do为一般式
2. to be doing强调同时进行
3. to have done表示先于谓语
4. 疑问词+不定式构成名词性结构
5. 省略to取决于使役感官等结构

【逻辑主语】
- To reduce inequality requires sustained effort.→不定式短语作主语
- The study is believed to have influenced policy.→完成式表示先发生

【先后与主被动】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 介词后误接to do
- 否定式not位置错误
- 把介词to与不定式to混淆

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','不定式可作主语、宾语、表语、定语、状语和补语，常表达目的、将来倾向或具体一次性动作。','high','high','2','["专项精讲", "考研英语", "nonfinite"]','curated-politics-english-v3','29','【核心规则】
不定式可作主语、宾语、表语、定语、状语和补语，常表达目的、将来倾向或具体一次性动作。

【非谓语身份】
1. to do为一般式
2. to be doing强调同时进行
3. to have done表示先于谓语
4. 疑问词+不定式构成名词性结构
5. 省略to取决于使役感官等结构

【逻辑主语】
- To reduce inequality requires sustained effort.→不定式短语作主语
- The study is believed to have influenced policy.→完成式表示先发生

【先后与主被动】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 介词后误接to do
- 否定式not位置错误
- 把介词to与不定式to混淆

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. to do为一般式
2. to be doing强调同时进行
3. to have done表示先于谓语
4. 疑问词+不定式构成名词性结构
5. 省略to取决于使役感官等结构','例1：To reduce inequality requires sustained effort.→不定式短语作主语
例2：The study is believed to have influenced policy.→完成式表示先发生','误区1：介词后误接to do。纠正时必须写出结构依据并给出正确改写。
误区2：否定式not位置错误。纠正时必须写出结构依据并给出正确改写。
误区3：把介词to与不定式to混淆。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“不定式”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：to do为一般式；to be doing强调同时进行；to have done表示先于谓语。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“不定式”的定义、形式和核心语义。
2. 在例句“To reduce inequality requires sustained effort.→不定式短语作主语”中逐词说明关键成分的功能。
3. 为什么“介词后误接to do”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“不定式”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：介词后误接to do','记忆主线：不定式可作主语、宾语、表语、定语、状语和补语，常表达目的、将来倾向或具体一次性动作。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_b1b8bd21b2c6ce54aa',NULL,'subject_english','ch_eng_grammar','动名词','【核心规则】
动名词具有名词功能又保留动词配价，可作主语、宾语、表语和介词宾语，常表达一般性活动或已发生经验。

【非谓语身份】
1. 介词后用doing
2. avoid/admit/consider等常接doing
3. 动名词可有逻辑主语
4. 完成式having done强调先发生

【逻辑主语】
- Reading critically requires checking evidence.→作主语
- He objected to changing the rule.→to是介词

【先后与主被动】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把look forward to后的to当不定式
- stop doing与stop to do混淆
- 逻辑主语格使用不当

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','动名词具有名词功能又保留动词配价，可作主语、宾语、表语和介词宾语，常表达一般性活动或已发生经验。','high','high','2','["专项精讲", "考研英语", "nonfinite"]','curated-politics-english-v3','30','【核心规则】
动名词具有名词功能又保留动词配价，可作主语、宾语、表语和介词宾语，常表达一般性活动或已发生经验。

【非谓语身份】
1. 介词后用doing
2. avoid/admit/consider等常接doing
3. 动名词可有逻辑主语
4. 完成式having done强调先发生

【逻辑主语】
- Reading critically requires checking evidence.→作主语
- He objected to changing the rule.→to是介词

【先后与主被动】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把look forward to后的to当不定式
- stop doing与stop to do混淆
- 逻辑主语格使用不当

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 介词后用doing
2. avoid/admit/consider等常接doing
3. 动名词可有逻辑主语
4. 完成式having done强调先发生','例1：Reading critically requires checking evidence.→作主语
例2：He objected to changing the rule.→to是介词','误区1：把look forward to后的to当不定式。纠正时必须写出结构依据并给出正确改写。
误区2：stop doing与stop to do混淆。纠正时必须写出结构依据并给出正确改写。
误区3：逻辑主语格使用不当。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“动名词”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：介词后用doing；avoid/admit/consider等常接doing；动名词可有逻辑主语。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“动名词”的定义、形式和核心语义。
2. 在例句“Reading critically requires checking evidence.→作主语”中逐词说明关键成分的功能。
3. 为什么“把look forward to后的to当不定式”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“动名词”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：把look forward to后的to当不定式','记忆主线：动名词具有名词功能又保留动词配价，可作主语、宾语、表语和介词宾语，常表达一般性活动或已发生经验。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_4d2ee8e1d3fa844c92',NULL,'subject_english','ch_eng_grammar','现在分词与过去分词','【核心规则】
分词可作定语、状语和补语；现在分词通常表示主动或进行，过去分词通常表示被动、完成或状态。

【非谓语身份】
1. 分词逻辑主语原则上与主句主语一致
2. 前置分词与后置分词修饰范围不同
3. 感情形容词-ing/-ed区分事物特征与人的感受
4. 完成分词表示先发生

【逻辑主语】
- Facing limited resources, the team changed its plan.→team是facing的逻辑主语
- Data collected online may be biased.→collected表被动

【先后与主被动】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 悬垂分词
- interesting/interested混用
- 过去分词一律译成“被”

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','分词可作定语、状语和补语；现在分词通常表示主动或进行，过去分词通常表示被动、完成或状态。','high','high','2','["专项精讲", "考研英语", "nonfinite"]','curated-politics-english-v3','31','【核心规则】
分词可作定语、状语和补语；现在分词通常表示主动或进行，过去分词通常表示被动、完成或状态。

【非谓语身份】
1. 分词逻辑主语原则上与主句主语一致
2. 前置分词与后置分词修饰范围不同
3. 感情形容词-ing/-ed区分事物特征与人的感受
4. 完成分词表示先发生

【逻辑主语】
- Facing limited resources, the team changed its plan.→team是facing的逻辑主语
- Data collected online may be biased.→collected表被动

【先后与主被动】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 悬垂分词
- interesting/interested混用
- 过去分词一律译成“被”

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 分词逻辑主语原则上与主句主语一致
2. 前置分词与后置分词修饰范围不同
3. 感情形容词-ing/-ed区分事物特征与人的感受
4. 完成分词表示先发生','例1：Facing limited resources, the team changed its plan.→team是facing的逻辑主语
例2：Data collected online may be biased.→collected表被动','误区1：悬垂分词。纠正时必须写出结构依据并给出正确改写。
误区2：interesting/interested混用。纠正时必须写出结构依据并给出正确改写。
误区3：过去分词一律译成“被”。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“现在分词与过去分词”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：分词逻辑主语原则上与主句主语一致；前置分词与后置分词修饰范围不同；感情形容词-ing/-ed区分事物特征与人的感受。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“现在分词与过去分词”的定义、形式和核心语义。
2. 在例句“Facing limited resources, the team changed its plan.→team是facing的逻辑主语”中逐词说明关键成分的功能。
3. 为什么“悬垂分词”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“现在分词与过去分词”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：悬垂分词','记忆主线：分词可作定语、状语和补语；现在分词通常表示主动或进行，过去分词通常表示被动、完成或状态。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_a868367c8476387bde',NULL,'subject_english','ch_eng_grammar','独立主格与with复合结构','【核心规则】
独立主格由名词或代词加非谓语、形容词、副词或介词短语构成，与主句存在逻辑关系但有独立主语。

【非谓语身份】
1. 名词+doing表主动进行
2. 名词+done表被动完成
3. 名词+to do表将来
4. with+宾语+补语更常见
5. 翻译时补出逻辑连词

【逻辑主语】
- Weather permitting, the survey will continue.→条件
- With the data collected, the team began analysis.→背景完成

【先后与主被动】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把独立主格当完整句
- 逻辑主语缺失
- with后补语形式与宾语关系不符

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','独立主格由名词或代词加非谓语、形容词、副词或介词短语构成，与主句存在逻辑关系但有独立主语。','high','high','2','["专项精讲", "考研英语", "nonfinite"]','curated-politics-english-v3','32','【核心规则】
独立主格由名词或代词加非谓语、形容词、副词或介词短语构成，与主句存在逻辑关系但有独立主语。

【非谓语身份】
1. 名词+doing表主动进行
2. 名词+done表被动完成
3. 名词+to do表将来
4. with+宾语+补语更常见
5. 翻译时补出逻辑连词

【逻辑主语】
- Weather permitting, the survey will continue.→条件
- With the data collected, the team began analysis.→背景完成

【先后与主被动】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把独立主格当完整句
- 逻辑主语缺失
- with后补语形式与宾语关系不符

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 名词+doing表主动进行
2. 名词+done表被动完成
3. 名词+to do表将来
4. with+宾语+补语更常见
5. 翻译时补出逻辑连词','例1：Weather permitting, the survey will continue.→条件
例2：With the data collected, the team began analysis.→背景完成','误区1：把独立主格当完整句。纠正时必须写出结构依据并给出正确改写。
误区2：逻辑主语缺失。纠正时必须写出结构依据并给出正确改写。
误区3：with后补语形式与宾语关系不符。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“独立主格与with复合结构”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：名词+doing表主动进行；名词+done表被动完成；名词+to do表将来。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“独立主格与with复合结构”的定义、形式和核心语义。
2. 在例句“Weather permitting, the survey will continue.→条件”中逐词说明关键成分的功能。
3. 为什么“把独立主格当完整句”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“独立主格与with复合结构”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：把独立主格当完整句','记忆主线：独立主格由名词或代词加非谓语、形容词、副词或介词短语构成，与主句存在逻辑关系但有独立主语。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_26d42954a45946ea2d',NULL,'subject_english','ch_eng_grammar','主语从句','【核心规则】
主语从句把一个命题整体放在主语位置，常由that、whether、疑问词或what引导；较长主语从句常后置并用形式主语it。

【从句功能】
1. that只起连接作用
2. whether表示是否
3. what在从句中作成分
4. It is+形容词/名词/过去分词+从句是高频结构

【连接词成分】
- What matters is how evidence is used.→what在从句中作主语
- It remains unclear whether the policy works.→whether从句后置

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- what与that混用
- 主语从句仍用疑问语序
- 形式主语it与指代it混淆

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','主语从句把一个命题整体放在主语位置，常由that、whether、疑问词或what引导；较长主语从句常后置并用形式主语it。','high','high','2','["专项精讲", "考研英语", "clause"]','curated-politics-english-v3','33','【核心规则】
主语从句把一个命题整体放在主语位置，常由that、whether、疑问词或what引导；较长主语从句常后置并用形式主语it。

【从句功能】
1. that只起连接作用
2. whether表示是否
3. what在从句中作成分
4. It is+形容词/名词/过去分词+从句是高频结构

【连接词成分】
- What matters is how evidence is used.→what在从句中作主语
- It remains unclear whether the policy works.→whether从句后置

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- what与that混用
- 主语从句仍用疑问语序
- 形式主语it与指代it混淆

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. that只起连接作用
2. whether表示是否
3. what在从句中作成分
4. It is+形容词/名词/过去分词+从句是高频结构','例1：What matters is how evidence is used.→what在从句中作主语
例2：It remains unclear whether the policy works.→whether从句后置','误区1：what与that混用。纠正时必须写出结构依据并给出正确改写。
误区2：主语从句仍用疑问语序。纠正时必须写出结构依据并给出正确改写。
误区3：形式主语it与指代it混淆。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“主语从句”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：that只起连接作用；whether表示是否；what在从句中作成分。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“主语从句”的定义、形式和核心语义。
2. 在例句“What matters is how evidence is used.→what在从句中作主语”中逐词说明关键成分的功能。
3. 为什么“what与that混用”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“主语从句”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：what与that混用','记忆主线：主语从句把一个命题整体放在主语位置，常由that、whether、疑问词或what引导；较长主语从句常后置并用形式主语it。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_4bbc72d651b88c56a1',NULL,'subject_english','ch_eng_grammar','宾语从句','【核心规则】
宾语从句作动词、介词或形容词的宾语，必须使用陈述语序，并根据谓语语义选择that、whether/if或疑问词。

【从句功能】
1. that常可省略但并列从句第二个that不宜省
2. whether比if适用范围更广
3. 介词后通常用whether
4. 时态呼应服从事实真值

【连接词成分】
- Researchers argue that context matters.→that从句作宾语
- We disagree about whether the change is necessary.→介词后用whether

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 从句用疑问语序
- 介词后用if
- 客观真理机械退为过去时

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','宾语从句作动词、介词或形容词的宾语，必须使用陈述语序，并根据谓语语义选择that、whether/if或疑问词。','high','high','2','["专项精讲", "考研英语", "clause"]','curated-politics-english-v3','34','【核心规则】
宾语从句作动词、介词或形容词的宾语，必须使用陈述语序，并根据谓语语义选择that、whether/if或疑问词。

【从句功能】
1. that常可省略但并列从句第二个that不宜省
2. whether比if适用范围更广
3. 介词后通常用whether
4. 时态呼应服从事实真值

【连接词成分】
- Researchers argue that context matters.→that从句作宾语
- We disagree about whether the change is necessary.→介词后用whether

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 从句用疑问语序
- 介词后用if
- 客观真理机械退为过去时

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. that常可省略但并列从句第二个that不宜省
2. whether比if适用范围更广
3. 介词后通常用whether
4. 时态呼应服从事实真值','例1：Researchers argue that context matters.→that从句作宾语
例2：We disagree about whether the change is necessary.→介词后用whether','误区1：从句用疑问语序。纠正时必须写出结构依据并给出正确改写。
误区2：介词后用if。纠正时必须写出结构依据并给出正确改写。
误区3：客观真理机械退为过去时。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“宾语从句”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：that常可省略但并列从句第二个that不宜省；whether比if适用范围更广；介词后通常用whether。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“宾语从句”的定义、形式和核心语义。
2. 在例句“Researchers argue that context matters.→that从句作宾语”中逐词说明关键成分的功能。
3. 为什么“从句用疑问语序”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“宾语从句”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：从句用疑问语序','记忆主线：宾语从句作动词、介词或形容词的宾语，必须使用陈述语序，并根据谓语语义选择that、whether/if或疑问词。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_189f828b7e5a569814',NULL,'subject_english','ch_eng_grammar','表语从句与同位语从句','【核心规则】
表语从句说明主语内容，同位语从句解释抽象名词的具体内容；二者与定语从句的区别在于从句是否缺少成分。

【从句功能】
1. 表语从句位于系动词后
2. 同位语从句常跟fact/idea/claim/evidence/question等
3. that在同位语从句中不作成分
4. 定语从句关系词必须承担成分

【连接词成分】
- The fact is that trust takes time.→表语从句
- The claim that the method is neutral is disputed.→同位语从句解释claim

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把同位语that当关系代词
- 同位语从句与定语从句只按位置判断
- reason后的表语从句误用because/that

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','表语从句说明主语内容，同位语从句解释抽象名词的具体内容；二者与定语从句的区别在于从句是否缺少成分。','high','high','2','["专项精讲", "考研英语", "clause"]','curated-politics-english-v3','35','【核心规则】
表语从句说明主语内容，同位语从句解释抽象名词的具体内容；二者与定语从句的区别在于从句是否缺少成分。

【从句功能】
1. 表语从句位于系动词后
2. 同位语从句常跟fact/idea/claim/evidence/question等
3. that在同位语从句中不作成分
4. 定语从句关系词必须承担成分

【连接词成分】
- The fact is that trust takes time.→表语从句
- The claim that the method is neutral is disputed.→同位语从句解释claim

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把同位语that当关系代词
- 同位语从句与定语从句只按位置判断
- reason后的表语从句误用because/that

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 表语从句位于系动词后
2. 同位语从句常跟fact/idea/claim/evidence/question等
3. that在同位语从句中不作成分
4. 定语从句关系词必须承担成分','例1：The fact is that trust takes time.→表语从句
例2：The claim that the method is neutral is disputed.→同位语从句解释claim','误区1：把同位语that当关系代词。纠正时必须写出结构依据并给出正确改写。
误区2：同位语从句与定语从句只按位置判断。纠正时必须写出结构依据并给出正确改写。
误区3：reason后的表语从句误用because/that。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“表语从句与同位语从句”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：表语从句位于系动词后；同位语从句常跟fact/idea/claim/evidence/question等；that在同位语从句中不作成分。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“表语从句与同位语从句”的定义、形式和核心语义。
2. 在例句“The fact is that trust takes time.→表语从句”中逐词说明关键成分的功能。
3. 为什么“把同位语that当关系代词”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“表语从句与同位语从句”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：把同位语that当关系代词','记忆主线：表语从句说明主语内容，同位语从句解释抽象名词的具体内容；二者与定语从句的区别在于从句是否缺少成分。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_6d088cccc288311e62',NULL,'subject_english','ch_eng_grammar','限制性与非限制性定语从句','【核心规则】
限制性定语从句限定先行词范围，是名词短语不可缺少的一部分；非限制性从句提供补充信息，用逗号隔开且不能用that。

【从句功能】
1. 关系代词在从句中作主宾定
2. 作宾语时限制性从句可省略
3. which可指代前面整句话
4. whose可指人或物的所属

【连接词成分】
- Students who revise regularly improve faster.→限定哪类学生
- The report, which was published yesterday, challenges the theory.→补充信息

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 非限制性从句用that
- 逗号随意添加
- 关系词省略后从句缺主语

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','限制性定语从句限定先行词范围，是名词短语不可缺少的一部分；非限制性从句提供补充信息，用逗号隔开且不能用that。','high','high','2','["专项精讲", "考研英语", "clause"]','curated-politics-english-v3','36','【核心规则】
限制性定语从句限定先行词范围，是名词短语不可缺少的一部分；非限制性从句提供补充信息，用逗号隔开且不能用that。

【从句功能】
1. 关系代词在从句中作主宾定
2. 作宾语时限制性从句可省略
3. which可指代前面整句话
4. whose可指人或物的所属

【连接词成分】
- Students who revise regularly improve faster.→限定哪类学生
- The report, which was published yesterday, challenges the theory.→补充信息

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 非限制性从句用that
- 逗号随意添加
- 关系词省略后从句缺主语

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 关系代词在从句中作主宾定
2. 作宾语时限制性从句可省略
3. which可指代前面整句话
4. whose可指人或物的所属','例1：Students who revise regularly improve faster.→限定哪类学生
例2：The report, which was published yesterday, challenges the theory.→补充信息','误区1：非限制性从句用that。纠正时必须写出结构依据并给出正确改写。
误区2：逗号随意添加。纠正时必须写出结构依据并给出正确改写。
误区3：关系词省略后从句缺主语。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“限制性与非限制性定语从句”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：关系代词在从句中作主宾定；作宾语时限制性从句可省略；which可指代前面整句话。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“限制性与非限制性定语从句”的定义、形式和核心语义。
2. 在例句“Students who revise regularly improve faster.→限定哪类学生”中逐词说明关键成分的功能。
3. 为什么“非限制性从句用that”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“限制性与非限制性定语从句”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：非限制性从句用that','记忆主线：限制性定语从句限定先行词范围，是名词短语不可缺少的一部分；非限制性从句提供补充信息，用逗号隔开且不能用that。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_fd9e16065025a3ab6e',NULL,'subject_english','ch_eng_grammar','介词加关系代词与关系副词','【核心规则】
介词+which/whom把从句内部介词前置，关系副词when/where/why相当于介词+which，但是否使用取决于从句中缺少的成分。

【从句功能】
1. 先行词是地点不必然用where
2. 从句缺宾语时用which/that
3. 介词选择来自从句搭配
4. the way后可用that/in which或省略

【连接词成分】
- The method by which data were collected matters.→by来自collect by the method
- The city where the study took place changed rapidly.→where作地点状语

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 看到时间地点原因名词就机械选when/where/why
- 介词与动词搭配不符
- 介词后用that

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','介词+which/whom把从句内部介词前置，关系副词when/where/why相当于介词+which，但是否使用取决于从句中缺少的成分。','high','high','2','["专项精讲", "考研英语", "clause"]','curated-politics-english-v3','37','【核心规则】
介词+which/whom把从句内部介词前置，关系副词when/where/why相当于介词+which，但是否使用取决于从句中缺少的成分。

【从句功能】
1. 先行词是地点不必然用where
2. 从句缺宾语时用which/that
3. 介词选择来自从句搭配
4. the way后可用that/in which或省略

【连接词成分】
- The method by which data were collected matters.→by来自collect by the method
- The city where the study took place changed rapidly.→where作地点状语

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 看到时间地点原因名词就机械选when/where/why
- 介词与动词搭配不符
- 介词后用that

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 先行词是地点不必然用where
2. 从句缺宾语时用which/that
3. 介词选择来自从句搭配
4. the way后可用that/in which或省略','例1：The method by which data were collected matters.→by来自collect by the method
例2：The city where the study took place changed rapidly.→where作地点状语','误区1：看到时间地点原因名词就机械选when/where/why。纠正时必须写出结构依据并给出正确改写。
误区2：介词与动词搭配不符。纠正时必须写出结构依据并给出正确改写。
误区3：介词后用that。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“介词加关系代词与关系副词”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：先行词是地点不必然用where；从句缺宾语时用which/that；介词选择来自从句搭配。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“介词加关系代词与关系副词”的定义、形式和核心语义。
2. 在例句“The method by which data were collected matters.→by来自collect by the method”中逐词说明关键成分的功能。
3. 为什么“看到时间地点原因名词就机械选when/where/why”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“介词加关系代词与关系副词”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：看到时间地点原因名词就机械选when/where/why','记忆主线：介词+which/whom把从句内部介词前置，关系副词when/where/why相当于介词+which，但是否使用取决于从句中缺少的成分。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_28722c9df080b1db0c',NULL,'subject_english','ch_eng_grammar','条件、让步与原因状语从句','【核心规则】
状语从句表达命题之间的条件、让步、原因和结果关系；连接词必须与真实逻辑一致，不能只凭中文对应。

【从句功能】
1. if/unless/provided that表条件
2. although/though/while/even if表让步
3. because强调直接原因，since/as常提供背景
4. so...that与such...that表达结果

【连接词成分】
- Although the sample is small, the pattern is clear.→让步不等于转折并列
- Unless evidence improves, the claim remains weak.→unless=if not

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- although与but并用
- because与so并用
- unless后再加not

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','状语从句表达命题之间的条件、让步、原因和结果关系；连接词必须与真实逻辑一致，不能只凭中文对应。','high','high','2','["专项精讲", "考研英语", "clause"]','curated-politics-english-v3','38','【核心规则】
状语从句表达命题之间的条件、让步、原因和结果关系；连接词必须与真实逻辑一致，不能只凭中文对应。

【从句功能】
1. if/unless/provided that表条件
2. although/though/while/even if表让步
3. because强调直接原因，since/as常提供背景
4. so...that与such...that表达结果

【连接词成分】
- Although the sample is small, the pattern is clear.→让步不等于转折并列
- Unless evidence improves, the claim remains weak.→unless=if not

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- although与but并用
- because与so并用
- unless后再加not

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. if/unless/provided that表条件
2. although/though/while/even if表让步
3. because强调直接原因，since/as常提供背景
4. so...that与such...that表达结果','例1：Although the sample is small, the pattern is clear.→让步不等于转折并列
例2：Unless evidence improves, the claim remains weak.→unless=if not','误区1：although与but并用。纠正时必须写出结构依据并给出正确改写。
误区2：because与so并用。纠正时必须写出结构依据并给出正确改写。
误区3：unless后再加not。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“条件、让步与原因状语从句”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：if/unless/provided that表条件；although/though/while/even if表让步；because强调直接原因，since/as常提供背景。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“条件、让步与原因状语从句”的定义、形式和核心语义。
2. 在例句“Although the sample is small, the pattern is clear.→让步不等于转折并列”中逐词说明关键成分的功能。
3. 为什么“although与but并用”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“条件、让步与原因状语从句”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：although与but并用','记忆主线：状语从句表达命题之间的条件、让步、原因和结果关系；连接词必须与真实逻辑一致，不能只凭中文对应。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_aea685676fe322daab',NULL,'subject_english','ch_eng_grammar','目的、结果、方式与比较状语','【核心规则】
目的从句说明行为目标，结果从句说明实际后果，方式和比较从句说明行为如何发生或不同对象之间的对应关系。

【从句功能】
1. so that/in order that表目的并常含情态动词
2. so/such...that表结果
3. as/just as表方式
4. than/as...as从句常发生省略

【连接词成分】
- The terms were defined clearly so that readers could compare the studies.→目的
- The change was so rapid that institutions could not adapt.→结果

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把so that所有用法都判目的
- 比较对象不平行
- than从句省略后错误补全

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','目的从句说明行为目标，结果从句说明实际后果，方式和比较从句说明行为如何发生或不同对象之间的对应关系。','high','high','2','["专项精讲", "考研英语", "clause"]','curated-politics-english-v3','39','【核心规则】
目的从句说明行为目标，结果从句说明实际后果，方式和比较从句说明行为如何发生或不同对象之间的对应关系。

【从句功能】
1. so that/in order that表目的并常含情态动词
2. so/such...that表结果
3. as/just as表方式
4. than/as...as从句常发生省略

【连接词成分】
- The terms were defined clearly so that readers could compare the studies.→目的
- The change was so rapid that institutions could not adapt.→结果

【边界识别】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把so that所有用法都判目的
- 比较对象不平行
- than从句省略后错误补全

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. so that/in order that表目的并常含情态动词
2. so/such...that表结果
3. as/just as表方式
4. than/as...as从句常发生省略','例1：The terms were defined clearly so that readers could compare the studies.→目的
例2：The change was so rapid that institutions could not adapt.→结果','误区1：把so that所有用法都判目的。纠正时必须写出结构依据并给出正确改写。
误区2：比较对象不平行。纠正时必须写出结构依据并给出正确改写。
误区3：than从句省略后错误补全。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“目的、结果、方式与比较状语”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：so that/in order that表目的并常含情态动词；so/such...that表结果；as/just as表方式。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“目的、结果、方式与比较状语”的定义、形式和核心语义。
2. 在例句“The terms were defined clearly so that readers could compare the studies.→目的”中逐词说明关键成分的功能。
3. 为什么“把so that所有用法都判目的”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“目的、结果、方式与比较状语”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：把so that所有用法都判目的','记忆主线：目的从句说明行为目标，结果从句说明实际后果，方式和比较从句说明行为如何发生或不同对象之间的对应关系。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_8c09c4c58d3f18d0c2',NULL,'subject_english','ch_eng_grammar','真实条件与虚拟条件','【核心规则】
真实条件讨论可能发生的条件，虚拟条件表达与现在、过去或将来事实相反或可能性很低的假设。

【特殊结构】
1. 现在反事实if+过去式，主句would do
2. 过去反事实if+had done，主句would have done
3. 将来低可能可用were to/should
4. 省略if时had/were/should倒装

【信息焦点】
- If the sample were larger, the estimate would be more reliable.→现在反事实
- Had the warning been heeded, the loss could have been avoided.→过去反事实倒装

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 所有if都用虚拟
- 主从句时间错配
- were/was规则不分正式语体

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','真实条件讨论可能发生的条件，虚拟条件表达与现在、过去或将来事实相反或可能性很低的假设。','high','high','2','["专项精讲", "考研英语", "special"]','curated-politics-english-v3','40','【核心规则】
真实条件讨论可能发生的条件，虚拟条件表达与现在、过去或将来事实相反或可能性很低的假设。

【特殊结构】
1. 现在反事实if+过去式，主句would do
2. 过去反事实if+had done，主句would have done
3. 将来低可能可用were to/should
4. 省略if时had/were/should倒装

【信息焦点】
- If the sample were larger, the estimate would be more reliable.→现在反事实
- Had the warning been heeded, the loss could have been avoided.→过去反事实倒装

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 所有if都用虚拟
- 主从句时间错配
- were/was规则不分正式语体

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 现在反事实if+过去式，主句would do
2. 过去反事实if+had done，主句would have done
3. 将来低可能可用were to/should
4. 省略if时had/were/should倒装','例1：If the sample were larger, the estimate would be more reliable.→现在反事实
例2：Had the warning been heeded, the loss could have been avoided.→过去反事实倒装','误区1：所有if都用虚拟。纠正时必须写出结构依据并给出正确改写。
误区2：主从句时间错配。纠正时必须写出结构依据并给出正确改写。
误区3：were/was规则不分正式语体。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“真实条件与虚拟条件”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：现在反事实if+过去式，主句would do；过去反事实if+had done，主句would have done；将来低可能可用were to/should。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“真实条件与虚拟条件”的定义、形式和核心语义。
2. 在例句“If the sample were larger, the estimate would be more reliable.→现在反事实”中逐词说明关键成分的功能。
3. 为什么“所有if都用虚拟”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“真实条件与虚拟条件”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：所有if都用虚拟','记忆主线：真实条件讨论可能发生的条件，虚拟条件表达与现在、过去或将来事实相反或可能性很低的假设。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_5cc320110cd841d99d',NULL,'subject_english','ch_eng_grammar','wish、as if与建议命令类虚拟','【核心规则】
wish、if only、as if、would rather等表达愿望或非事实比较；suggest/insist/demand等表示建议命令时从句常用should+动词原形。

【特殊结构】
1. wish过去式表对现在遗憾，had done表过去遗憾
2. as if是否虚拟取决于真实性
3. suggest表示“暗示”不用虚拟
4. insist表示“坚持认为”不用虚拟

【信息焦点】
- I wish the evidence were clearer.→对现在愿望
- The data suggest that the trend is real.→suggest为“表明”不用虚拟

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 见suggest一律用should
- wish与hope混用
- would rather从句时态错误

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','wish、if only、as if、would rather等表达愿望或非事实比较；suggest/insist/demand等表示建议命令时从句常用should+动词原形。','high','high','2','["专项精讲", "考研英语", "special"]','curated-politics-english-v3','41','【核心规则】
wish、if only、as if、would rather等表达愿望或非事实比较；suggest/insist/demand等表示建议命令时从句常用should+动词原形。

【特殊结构】
1. wish过去式表对现在遗憾，had done表过去遗憾
2. as if是否虚拟取决于真实性
3. suggest表示“暗示”不用虚拟
4. insist表示“坚持认为”不用虚拟

【信息焦点】
- I wish the evidence were clearer.→对现在愿望
- The data suggest that the trend is real.→suggest为“表明”不用虚拟

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 见suggest一律用should
- wish与hope混用
- would rather从句时态错误

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. wish过去式表对现在遗憾，had done表过去遗憾
2. as if是否虚拟取决于真实性
3. suggest表示“暗示”不用虚拟
4. insist表示“坚持认为”不用虚拟','例1：I wish the evidence were clearer.→对现在愿望
例2：The data suggest that the trend is real.→suggest为“表明”不用虚拟','误区1：见suggest一律用should。纠正时必须写出结构依据并给出正确改写。
误区2：wish与hope混用。纠正时必须写出结构依据并给出正确改写。
误区3：would rather从句时态错误。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“wish、as if与建议命令类虚拟”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：wish过去式表对现在遗憾，had done表过去遗憾；as if是否虚拟取决于真实性；suggest表示“暗示”不用虚拟。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“wish、as if与建议命令类虚拟”的定义、形式和核心语义。
2. 在例句“I wish the evidence were clearer.→对现在愿望”中逐词说明关键成分的功能。
3. 为什么“见suggest一律用should”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“wish、as if与建议命令类虚拟”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：见suggest一律用should','记忆主线：wish、if only、as if、would rather等表达愿望或非事实比较；suggest/insist/demand等表示建议命令时从句常用should+动词原形。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_aaf678a26fb4f9eb9c',NULL,'subject_english','ch_eng_grammar','倒装、强调与否定前置','【核心规则】
倒装用于语法要求或信息强调；强调句It is/was...that/who...只能强调句子成分，移除框架后原句仍应完整。

【特殊结构】
1. 否定副词置首触发部分倒装
2. only+状语置首倒装
3. so/neither/nor表示相同情况
4. 地点方向副词置首可完全倒装
5. 强调句不能强调谓语

【信息焦点】
- Only then did the problem become clear.→部分倒装
- It was the method that caused the bias.→强调method

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- only修饰主语仍倒装
- 强调句与主语从句混淆
- 否定前置后忘记助动词

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','倒装用于语法要求或信息强调；强调句It is/was...that/who...只能强调句子成分，移除框架后原句仍应完整。','high','high','2','["专项精讲", "考研英语", "special"]','curated-politics-english-v3','42','【核心规则】
倒装用于语法要求或信息强调；强调句It is/was...that/who...只能强调句子成分，移除框架后原句仍应完整。

【特殊结构】
1. 否定副词置首触发部分倒装
2. only+状语置首倒装
3. so/neither/nor表示相同情况
4. 地点方向副词置首可完全倒装
5. 强调句不能强调谓语

【信息焦点】
- Only then did the problem become clear.→部分倒装
- It was the method that caused the bias.→强调method

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- only修饰主语仍倒装
- 强调句与主语从句混淆
- 否定前置后忘记助动词

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 否定副词置首触发部分倒装
2. only+状语置首倒装
3. so/neither/nor表示相同情况
4. 地点方向副词置首可完全倒装
5. 强调句不能强调谓语','例1：Only then did the problem become clear.→部分倒装
例2：It was the method that caused the bias.→强调method','误区1：only修饰主语仍倒装。纠正时必须写出结构依据并给出正确改写。
误区2：强调句与主语从句混淆。纠正时必须写出结构依据并给出正确改写。
误区3：否定前置后忘记助动词。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“倒装、强调与否定前置”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：否定副词置首触发部分倒装；only+状语置首倒装；so/neither/nor表示相同情况。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“倒装、强调与否定前置”的定义、形式和核心语义。
2. 在例句“Only then did the problem become clear.→部分倒装”中逐词说明关键成分的功能。
3. 为什么“only修饰主语仍倒装”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“倒装、强调与否定前置”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：only修饰主语仍倒装','记忆主线：倒装用于语法要求或信息强调；强调句It is/was...that/who...只能强调句子成分，移除框架后原句仍应完整。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_dd27d9dcb243f2de2c',NULL,'subject_english','ch_eng_grammar','省略、替代与平行结构','【核心规则】
省略删除可由语境恢复的成分，替代用do/so/one等避免重复；平行结构要求并列项在语法形式和逻辑层级上对应。

【特殊结构】
1. 比较从句和状语从句常省略
2. do so替代动词短语
3. one/ones替代可数名词
4. not only...but also连接同类成分
5. 相关并列词决定一致

【信息焦点】
- The policy aims to reduce costs and improve access.→两个不定式平行
- Some studies support the claim, while others do not.→do not替代support the claim

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 并列名词与从句
- 省略后产生歧义
- one替代不可数名词

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','省略删除可由语境恢复的成分，替代用do/so/one等避免重复；平行结构要求并列项在语法形式和逻辑层级上对应。','high','high','2','["专项精讲", "考研英语", "special"]','curated-politics-english-v3','43','【核心规则】
省略删除可由语境恢复的成分，替代用do/so/one等避免重复；平行结构要求并列项在语法形式和逻辑层级上对应。

【特殊结构】
1. 比较从句和状语从句常省略
2. do so替代动词短语
3. one/ones替代可数名词
4. not only...but also连接同类成分
5. 相关并列词决定一致

【信息焦点】
- The policy aims to reduce costs and improve access.→两个不定式平行
- Some studies support the claim, while others do not.→do not替代support the claim

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 并列名词与从句
- 省略后产生歧义
- one替代不可数名词

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 比较从句和状语从句常省略
2. do so替代动词短语
3. one/ones替代可数名词
4. not only...but also连接同类成分
5. 相关并列词决定一致','例1：The policy aims to reduce costs and improve access.→两个不定式平行
例2：Some studies support the claim, while others do not.→do not替代support the claim','误区1：并列名词与从句。纠正时必须写出结构依据并给出正确改写。
误区2：省略后产生歧义。纠正时必须写出结构依据并给出正确改写。
误区3：one替代不可数名词。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“省略、替代与平行结构”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：比较从句和状语从句常省略；do so替代动词短语；one/ones替代可数名词。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“省略、替代与平行结构”的定义、形式和核心语义。
2. 在例句“The policy aims to reduce costs and improve access.→两个不定式平行”中逐词说明关键成分的功能。
3. 为什么“并列名词与从句”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“省略、替代与平行结构”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：并列名词与从句','记忆主线：省略删除可由语境恢复的成分，替代用do/so/one等避免重复；平行结构要求并列项在语法形式和逻辑层级上对应。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_4207e7bad0bf891116',NULL,'subject_english','ch_eng_grammar','it结构与there存在句','【核心规则】
it可作指代词、形式主语、形式宾语或强调结构成分；there be引入新信息，真正主语位于be之后。

【特殊结构】
1. It takes...to do表示耗时
2. find it+补语+to do为形式宾语
3. there be的数通常与最近主语协调
4. there可与seem/appear/remain等连用

【信息焦点】
- We find it difficult to separate cause from correlation.→形式宾语
- There appear to be several explanations.→存在句扩展

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 所有it都译“它”
- there be与have混用
- 形式宾语后漏to do

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','it可作指代词、形式主语、形式宾语或强调结构成分；there be引入新信息，真正主语位于be之后。','high','high','2','["专项精讲", "考研英语", "special"]','curated-politics-english-v3','44','【核心规则】
it可作指代词、形式主语、形式宾语或强调结构成分；there be引入新信息，真正主语位于be之后。

【特殊结构】
1. It takes...to do表示耗时
2. find it+补语+to do为形式宾语
3. there be的数通常与最近主语协调
4. there可与seem/appear/remain等连用

【信息焦点】
- We find it difficult to separate cause from correlation.→形式宾语
- There appear to be several explanations.→存在句扩展

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 所有it都译“它”
- there be与have混用
- 形式宾语后漏to do

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. It takes...to do表示耗时
2. find it+补语+to do为形式宾语
3. there be的数通常与最近主语协调
4. there可与seem/appear/remain等连用','例1：We find it difficult to separate cause from correlation.→形式宾语
例2：There appear to be several explanations.→存在句扩展','误区1：所有it都译“它”。纠正时必须写出结构依据并给出正确改写。
误区2：there be与have混用。纠正时必须写出结构依据并给出正确改写。
误区3：形式宾语后漏to do。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“it结构与there存在句”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：It takes...to do表示耗时；find it+补语+to do为形式宾语；there be的数通常与最近主语协调。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“it结构与there存在句”的定义、形式和核心语义。
2. 在例句“We find it difficult to separate cause from correlation.→形式宾语”中逐词说明关键成分的功能。
3. 为什么“所有it都译“它””属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“it结构与there存在句”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：所有it都译“它”','记忆主线：it可作指代词、形式主语、形式宾语或强调结构成分；there be引入新信息，真正主语位于be之后。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_b4b394e4e69e7fb26a',NULL,'subject_english','ch_eng_grammar','比较结构与倍数表达','【核心规则】
比较结构必须明确比较对象、范围和维度，并保持两端语法与逻辑平行。

【特殊结构】
1. 比较级+than
2. as...as
3. the+比较级...,the+比较级...
4. 倍数可用times as...as或times the noun of
5. no more than与not more than意义不同

【信息焦点】
- The new method is twice as efficient as the old one.→比较对象平行
- The more data we collect, the clearer the pattern becomes.→联动比较

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 比较对象偷换
- 倍数位置错误
- 最高级遗漏比较范围

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','比较结构必须明确比较对象、范围和维度，并保持两端语法与逻辑平行。','high','high','2','["专项精讲", "考研英语", "special"]','curated-politics-english-v3','45','【核心规则】
比较结构必须明确比较对象、范围和维度，并保持两端语法与逻辑平行。

【特殊结构】
1. 比较级+than
2. as...as
3. the+比较级...,the+比较级...
4. 倍数可用times as...as或times the noun of
5. no more than与not more than意义不同

【信息焦点】
- The new method is twice as efficient as the old one.→比较对象平行
- The more data we collect, the clearer the pattern becomes.→联动比较

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 比较对象偷换
- 倍数位置错误
- 最高级遗漏比较范围

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 比较级+than
2. as...as
3. the+比较级...,the+比较级...
4. 倍数可用times as...as或times the noun of
5. no more than与not more than意义不同','例1：The new method is twice as efficient as the old one.→比较对象平行
例2：The more data we collect, the clearer the pattern becomes.→联动比较','误区1：比较对象偷换。纠正时必须写出结构依据并给出正确改写。
误区2：倍数位置错误。纠正时必须写出结构依据并给出正确改写。
误区3：最高级遗漏比较范围。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“比较结构与倍数表达”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：比较级+than；as...as；the+比较级...,the+比较级...。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“比较结构与倍数表达”的定义、形式和核心语义。
2. 在例句“The new method is twice as efficient as the old one.→比较对象平行”中逐词说明关键成分的功能。
3. 为什么“比较对象偷换”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“比较结构与倍数表达”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：比较对象偷换','记忆主线：比较结构必须明确比较对象、范围和维度，并保持两端语法与逻辑平行。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_795abda822dc64511e',NULL,'subject_english','ch_eng_grammar','否定范围、部分否定与双重否定','【核心规则】
否定词的位置决定否定范围；all/both/every与not组合常构成部分否定，never、hardly、scarcely等具有否定意义。

【特殊结构】
1. not all=并非全部
2. none=全部不
3. not necessarily=未必
4. fail to/not uncommon等可形成委婉或双重否定
5. 否定转移常见于think/believe/suppose

【信息焦点】
- Not all correlations indicate causation.→部分否定
- The result is not uncommon.→并非罕见

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把not all译成“全部不”
- 忽略hardly的否定
- 否定转移按字面处理

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','否定词的位置决定否定范围；all/both/every与not组合常构成部分否定，never、hardly、scarcely等具有否定意义。','high','high','2','["专项精讲", "考研英语", "special"]','curated-politics-english-v3','46','【核心规则】
否定词的位置决定否定范围；all/both/every与not组合常构成部分否定，never、hardly、scarcely等具有否定意义。

【特殊结构】
1. not all=并非全部
2. none=全部不
3. not necessarily=未必
4. fail to/not uncommon等可形成委婉或双重否定
5. 否定转移常见于think/believe/suppose

【信息焦点】
- Not all correlations indicate causation.→部分否定
- The result is not uncommon.→并非罕见

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 把not all译成“全部不”
- 忽略hardly的否定
- 否定转移按字面处理

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. not all=并非全部
2. none=全部不
3. not necessarily=未必
4. fail to/not uncommon等可形成委婉或双重否定
5. 否定转移常见于think/believe/suppose','例1：Not all correlations indicate causation.→部分否定
例2：The result is not uncommon.→并非罕见','误区1：把not all译成“全部不”。纠正时必须写出结构依据并给出正确改写。
误区2：忽略hardly的否定。纠正时必须写出结构依据并给出正确改写。
误区3：否定转移按字面处理。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“否定范围、部分否定与双重否定”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：not all=并非全部；none=全部不；not necessarily=未必。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“否定范围、部分否定与双重否定”的定义、形式和核心语义。
2. 在例句“Not all correlations indicate causation.→部分否定”中逐词说明关键成分的功能。
3. 为什么“把not all译成“全部不””属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“否定范围、部分否定与双重否定”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：把not all译成“全部不”','记忆主线：否定词的位置决定否定范围；all/both/every与not组合常构成部分否定，never、hardly、scarcely等具有否定意义。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_8bc6b73ef8c16825d7',NULL,'subject_english','ch_eng_grammar','标点、并列与句子边界','【核心规则】
英语完整句之间不能只用逗号连接；逗号、分号、冒号、破折号和括号分别表示不同层级的停顿与逻辑。

【特殊结构】
1. 两个独立分句用句号、分号或并列连词
2. 冒号引出解释或列举
3. 非限制性成分用逗号隔开
4. 分号可连接紧密相关独立句

【信息焦点】
- The evidence is limited; nevertheless, the conclusion is plausible.→分号连接独立句
- The study has one weakness: its sample is small.→冒号解释

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 逗号拼接句
- 连接副词前只用逗号
- 限制性成分误加逗号

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','英语完整句之间不能只用逗号连接；逗号、分号、冒号、破折号和括号分别表示不同层级的停顿与逻辑。','high','high','2','["专项精讲", "考研英语", "special"]','curated-politics-english-v3','47','【核心规则】
英语完整句之间不能只用逗号连接；逗号、分号、冒号、破折号和括号分别表示不同层级的停顿与逻辑。

【特殊结构】
1. 两个独立分句用句号、分号或并列连词
2. 冒号引出解释或列举
3. 非限制性成分用逗号隔开
4. 分号可连接紧密相关独立句

【信息焦点】
- The evidence is limited; nevertheless, the conclusion is plausible.→分号连接独立句
- The study has one weakness: its sample is small.→冒号解释

【改写验证】
考研阅读中先圈出有限谓语和连接词，再确定该结构的修饰对象与逻辑范围；翻译时先恢复完整命题，再按中文信息顺序重组；写作时必须检查形式、搭配和语义条件是否同时成立。

【边界与反例】
- 逗号拼接句
- 连接副词前只用逗号
- 限制性成分误加逗号

【迁移要求】
能够在陌生长句中完成“找谓语—划边界—判功能—还原省略—确定逻辑—自然翻译”六步，并能解释错误选项究竟违反哪条规则，而不是只凭语感选答案。','1. 两个独立分句用句号、分号或并列连词
2. 冒号引出解释或列举
3. 非限制性成分用逗号隔开
4. 分号可连接紧密相关独立句','例1：The evidence is limited; nevertheless, the conclusion is plausible.→分号连接独立句
例2：The study has one weakness: its sample is small.→冒号解释','误区1：逗号拼接句。纠正时必须写出结构依据并给出正确改写。
误区2：连接副词前只用逗号。纠正时必须写出结构依据并给出正确改写。
误区3：限制性成分误加逗号。纠正时必须写出结构依据并给出正确改写。','1. 从近十年阅读或翻译真题中找出3个包含“标点、并列与句子边界”的句子，标出有限谓语、连接词、先行词或逻辑主语。
2. 对每个例句分别做直译、结构译和自然译，对照检查是否遗漏否定、范围、时态、主被动或指代。
3. 根据以下规则各造一个正确句并写一个典型错误句：两个独立分句用句号、分号或并列连词；冒号引出解释或列举；非限制性成分用逗号隔开。
4. 48小时后闭卷解释该结构与相邻语法点的区别，并完成一次限时纠错。','1. 用不超过120字说明“标点、并列与句子边界”的定义、形式和核心语义。
2. 在例句“The evidence is limited; nevertheless, the conclusion is plausible.→分号连接独立句”中逐词说明关键成分的功能。
3. 为什么“逗号拼接句”属于错误或高风险判断？
4. 将一个含该结构的英文长句改写为两个简单句，再重新合并，比较信息焦点变化。
5. 写出一道包含干扰项的选择题并解释每个选项。','语法分析不要套空泛模板。作答顺序固定为：①指出“标点、并列与句子边界”在句中承担的具体功能；②写出形式标志；③确定它修饰或支配的对象；④说明时间、主被动、范围或逻辑关系；⑤结合上下文给出自然译文；⑥用替换、删除或改写验证判断。','重点检查：逗号拼接句','记忆主线：英语完整句之间不能只用逗号连接；逗号、分号、冒号、破折号和括号分别表示不同层级的停顿与逻辑。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_cb331d86d025ce0070',NULL,'subject_politics','ch_pol_my_phil','世界的物质统一性','【核心命题】
世界统一于物质，物质是不依赖人的意识并能为人的意识所反映的客观实在；运动、时间和空间是物质存在的基本形式。

【原理层次】
1. 坚持从客观实际出发
2. 反对把精神或观念当作世界本原
3. 承认意识具有能动反作用但不能脱离物质条件
4. 自然界与人类社会都具有客观物质性

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 材料把主观愿望当作现实条件时，应指出其违背物质决定意识
- 材料强调调查研究和因地制宜时，应联系一切从实际出发

【易错边界】
- 把“世界的物质统一性”只写成口号而不说明成立条件
- 只背“坚持从客观实际出发
- 反对把精神或观念当作世界本原
- 承认意识具有能动反作用但不能脱离物质条件
- 自然界与人类社会都具有客观物质性”而不建立因果链
- 材料分析忽略“坚持从客观实际出发
- 反对把精神或观念当作世界本原
- 承认意识具有能动反作用但不能脱离物质条件
- 自然界与人类社会都具有客观物质性”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','世界统一于物质，物质是不依赖人的意识并能为人的意识所反映的客观实在；运动、时间和空间是物质存在的基本形式。','high','high','2','["专项精讲", "考研政治", "principle"]','curated-politics-english-v3','21','【核心命题】
世界统一于物质，物质是不依赖人的意识并能为人的意识所反映的客观实在；运动、时间和空间是物质存在的基本形式。

【原理层次】
1. 坚持从客观实际出发
2. 反对把精神或观念当作世界本原
3. 承认意识具有能动反作用但不能脱离物质条件
4. 自然界与人类社会都具有客观物质性

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 材料把主观愿望当作现实条件时，应指出其违背物质决定意识
- 材料强调调查研究和因地制宜时，应联系一切从实际出发

【易错边界】
- 把“世界的物质统一性”只写成口号而不说明成立条件
- 只背“坚持从客观实际出发
- 反对把精神或观念当作世界本原
- 承认意识具有能动反作用但不能脱离物质条件
- 自然界与人类社会都具有客观物质性”而不建立因果链
- 材料分析忽略“坚持从客观实际出发
- 反对把精神或观念当作世界本原
- 承认意识具有能动反作用但不能脱离物质条件
- 自然界与人类社会都具有客观物质性”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 坚持从客观实际出发
2. 反对把精神或观念当作世界本原
3. 承认意识具有能动反作用但不能脱离物质条件
4. 自然界与人类社会都具有客观物质性','材料角度1：材料把主观愿望当作现实条件时，应指出其违背物质决定意识
材料角度2：材料强调调查研究和因地制宜时，应联系一切从实际出发','误区1：把“世界的物质统一性”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“坚持从客观实际出发。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：反对把精神或观念当作世界本原。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：承认意识具有能动反作用但不能脱离物质条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：自然界与人类社会都具有客观物质性”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“坚持从客观实际出发。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：反对把精神或观念当作世界本原。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：承认意识具有能动反作用但不能脱离物质条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：自然界与人类社会都具有客观物质性”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“世界的物质统一性”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “世界的物质统一性”解决的核心问题是什么？
2. 写出三个关键关系：坚持从客观实际出发；反对把精神或观念当作世界本原；承认意识具有能动反作用但不能脱离物质条件。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“世界的物质统一性”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“世界的物质统一性”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“世界的物质统一性”只写成口号而不说明成立条件','记忆主线：世界统一于物质，物质是不依赖人的意识并能为人的意识所反映的客观实在；运动、时间和空间是物质存在的基本形式。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_61595bbac133038ce1',NULL,'subject_politics','ch_pol_my_phil','矛盾的普遍性与特殊性','【核心命题】
矛盾普遍性说明矛盾存在于一切事物发展过程，特殊性说明不同事物及同一事物不同阶段的矛盾各有特点；二者相互联结并在一定条件下转化。

【原理层次】
1. 普遍性寓于特殊性之中并通过特殊性表现
2. 特殊性包含普遍性
3. 具体问题具体分析是马克思主义活的灵魂
4. 一般号召必须转化为分类施策

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 共同规律不能代替具体条件
- 地方经验可提炼一般方法但不能机械照搬
- 试点推广体现由特殊到一般再到特殊

【易错边界】
- 把“矛盾的普遍性与特殊性”只写成口号而不说明成立条件
- 只背“普遍性寓于特殊性之中并通过特殊性表现
- 特殊性包含普遍性
- 具体问题具体分析是马克思主义活的灵魂
- 一般号召必须转化为分类施策”而不建立因果链
- 材料分析忽略“普遍性寓于特殊性之中并通过特殊性表现
- 特殊性包含普遍性
- 具体问题具体分析是马克思主义活的灵魂
- 一般号召必须转化为分类施策”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','矛盾普遍性说明矛盾存在于一切事物发展过程，特殊性说明不同事物及同一事物不同阶段的矛盾各有特点；二者相互联结并在一定条件下转化。','high','high','2','["专项精讲", "考研政治", "principle"]','curated-politics-english-v3','22','【核心命题】
矛盾普遍性说明矛盾存在于一切事物发展过程，特殊性说明不同事物及同一事物不同阶段的矛盾各有特点；二者相互联结并在一定条件下转化。

【原理层次】
1. 普遍性寓于特殊性之中并通过特殊性表现
2. 特殊性包含普遍性
3. 具体问题具体分析是马克思主义活的灵魂
4. 一般号召必须转化为分类施策

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 共同规律不能代替具体条件
- 地方经验可提炼一般方法但不能机械照搬
- 试点推广体现由特殊到一般再到特殊

【易错边界】
- 把“矛盾的普遍性与特殊性”只写成口号而不说明成立条件
- 只背“普遍性寓于特殊性之中并通过特殊性表现
- 特殊性包含普遍性
- 具体问题具体分析是马克思主义活的灵魂
- 一般号召必须转化为分类施策”而不建立因果链
- 材料分析忽略“普遍性寓于特殊性之中并通过特殊性表现
- 特殊性包含普遍性
- 具体问题具体分析是马克思主义活的灵魂
- 一般号召必须转化为分类施策”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 普遍性寓于特殊性之中并通过特殊性表现
2. 特殊性包含普遍性
3. 具体问题具体分析是马克思主义活的灵魂
4. 一般号召必须转化为分类施策','材料角度1：共同规律不能代替具体条件
材料角度2：地方经验可提炼一般方法但不能机械照搬
材料角度3：试点推广体现由特殊到一般再到特殊','误区1：把“矛盾的普遍性与特殊性”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“普遍性寓于特殊性之中并通过特殊性表现。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：特殊性包含普遍性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：具体问题具体分析是马克思主义活的灵魂。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：一般号召必须转化为分类施策”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“普遍性寓于特殊性之中并通过特殊性表现。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：特殊性包含普遍性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：具体问题具体分析是马克思主义活的灵魂。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：一般号召必须转化为分类施策”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“矛盾的普遍性与特殊性”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “矛盾的普遍性与特殊性”解决的核心问题是什么？
2. 写出三个关键关系：普遍性寓于特殊性之中并通过特殊性表现；特殊性包含普遍性；具体问题具体分析是马克思主义活的灵魂。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“矛盾的普遍性与特殊性”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“矛盾的普遍性与特殊性”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“矛盾的普遍性与特殊性”只写成口号而不说明成立条件','记忆主线：矛盾普遍性说明矛盾存在于一切事物发展过程，特殊性说明不同事物及同一事物不同阶段的矛盾各有特点；二者相互联结并在一定条件下转化。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_02853d3bca18500d83',NULL,'subject_politics','ch_pol_my_phil','主要矛盾与矛盾主要方面','【核心命题】
主要矛盾在复杂事物中处于支配地位，矛盾主要方面在一个矛盾内部居于支配地位并规定事物性质。

【原理层次】
1. 办事情抓重点对应主要矛盾
2. 看问题抓主流对应主要方面
3. 二者都不是固定不变
4. 次要矛盾和次要方面也会影响全局

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 中心工作与工作中的主流不是同一层次
- 不能以抓重点为由忽视统筹
- 条件变化可能引起地位转化

【易错边界】
- 把“主要矛盾与矛盾主要方面”只写成口号而不说明成立条件
- 只背“办事情抓重点对应主要矛盾
- 看问题抓主流对应主要方面
- 二者都不是固定不变
- 次要矛盾和次要方面也会影响全局”而不建立因果链
- 材料分析忽略“办事情抓重点对应主要矛盾
- 看问题抓主流对应主要方面
- 二者都不是固定不变
- 次要矛盾和次要方面也会影响全局”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','主要矛盾在复杂事物中处于支配地位，矛盾主要方面在一个矛盾内部居于支配地位并规定事物性质。','high','high','2','["专项精讲", "考研政治", "principle"]','curated-politics-english-v3','23','【核心命题】
主要矛盾在复杂事物中处于支配地位，矛盾主要方面在一个矛盾内部居于支配地位并规定事物性质。

【原理层次】
1. 办事情抓重点对应主要矛盾
2. 看问题抓主流对应主要方面
3. 二者都不是固定不变
4. 次要矛盾和次要方面也会影响全局

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 中心工作与工作中的主流不是同一层次
- 不能以抓重点为由忽视统筹
- 条件变化可能引起地位转化

【易错边界】
- 把“主要矛盾与矛盾主要方面”只写成口号而不说明成立条件
- 只背“办事情抓重点对应主要矛盾
- 看问题抓主流对应主要方面
- 二者都不是固定不变
- 次要矛盾和次要方面也会影响全局”而不建立因果链
- 材料分析忽略“办事情抓重点对应主要矛盾
- 看问题抓主流对应主要方面
- 二者都不是固定不变
- 次要矛盾和次要方面也会影响全局”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 办事情抓重点对应主要矛盾
2. 看问题抓主流对应主要方面
3. 二者都不是固定不变
4. 次要矛盾和次要方面也会影响全局','材料角度1：中心工作与工作中的主流不是同一层次
材料角度2：不能以抓重点为由忽视统筹
材料角度3：条件变化可能引起地位转化','误区1：把“主要矛盾与矛盾主要方面”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“办事情抓重点对应主要矛盾。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：看问题抓主流对应主要方面。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：二者都不是固定不变。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：次要矛盾和次要方面也会影响全局”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“办事情抓重点对应主要矛盾。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：看问题抓主流对应主要方面。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：二者都不是固定不变。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：次要矛盾和次要方面也会影响全局”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“主要矛盾与矛盾主要方面”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “主要矛盾与矛盾主要方面”解决的核心问题是什么？
2. 写出三个关键关系：办事情抓重点对应主要矛盾；看问题抓主流对应主要方面；二者都不是固定不变。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“主要矛盾与矛盾主要方面”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“主要矛盾与矛盾主要方面”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“主要矛盾与矛盾主要方面”只写成口号而不说明成立条件','记忆主线：主要矛盾在复杂事物中处于支配地位，矛盾主要方面在一个矛盾内部居于支配地位并规定事物性质。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_838a19274d40869472',NULL,'subject_politics','ch_pol_my_phil','原因结果、必然偶然与可能现实','【核心命题】
原因和结果相互作用并可在具体关系中转换；必然通过偶然表现并为自己开辟道路；现实是已经实现的可能，可能转化为现实需要根据和条件。

【原理层次】
1. 分析因果要防止单因论
2. 认识必然性要研究大量偶然现象
3. 区分现实可能与抽象可能
4. 创造条件可推动有利可能转化

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 风险治理要识别诱因、机制与后果
- 偶发事件可暴露深层必然趋势
- 目标可行性必须落到资源制度和主体条件

【易错边界】
- 把“原因结果、必然偶然与可能现实”只写成口号而不说明成立条件
- 只背“分析因果要防止单因论
- 认识必然性要研究大量偶然现象
- 区分现实可能与抽象可能
- 创造条件可推动有利可能转化”而不建立因果链
- 材料分析忽略“分析因果要防止单因论
- 认识必然性要研究大量偶然现象
- 区分现实可能与抽象可能
- 创造条件可推动有利可能转化”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','原因和结果相互作用并可在具体关系中转换；必然通过偶然表现并为自己开辟道路；现实是已经实现的可能，可能转化为现实需要根据和条件。','high','high','2','["专项精讲", "考研政治", "principle"]','curated-politics-english-v3','24','【核心命题】
原因和结果相互作用并可在具体关系中转换；必然通过偶然表现并为自己开辟道路；现实是已经实现的可能，可能转化为现实需要根据和条件。

【原理层次】
1. 分析因果要防止单因论
2. 认识必然性要研究大量偶然现象
3. 区分现实可能与抽象可能
4. 创造条件可推动有利可能转化

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 风险治理要识别诱因、机制与后果
- 偶发事件可暴露深层必然趋势
- 目标可行性必须落到资源制度和主体条件

【易错边界】
- 把“原因结果、必然偶然与可能现实”只写成口号而不说明成立条件
- 只背“分析因果要防止单因论
- 认识必然性要研究大量偶然现象
- 区分现实可能与抽象可能
- 创造条件可推动有利可能转化”而不建立因果链
- 材料分析忽略“分析因果要防止单因论
- 认识必然性要研究大量偶然现象
- 区分现实可能与抽象可能
- 创造条件可推动有利可能转化”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 分析因果要防止单因论
2. 认识必然性要研究大量偶然现象
3. 区分现实可能与抽象可能
4. 创造条件可推动有利可能转化','材料角度1：风险治理要识别诱因、机制与后果
材料角度2：偶发事件可暴露深层必然趋势
材料角度3：目标可行性必须落到资源制度和主体条件','误区1：把“原因结果、必然偶然与可能现实”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“分析因果要防止单因论。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：认识必然性要研究大量偶然现象。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：区分现实可能与抽象可能。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：创造条件可推动有利可能转化”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“分析因果要防止单因论。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：认识必然性要研究大量偶然现象。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：区分现实可能与抽象可能。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：创造条件可推动有利可能转化”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“原因结果、必然偶然与可能现实”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “原因结果、必然偶然与可能现实”解决的核心问题是什么？
2. 写出三个关键关系：分析因果要防止单因论；认识必然性要研究大量偶然现象；区分现实可能与抽象可能。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“原因结果、必然偶然与可能现实”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“原因结果、必然偶然与可能现实”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“原因结果、必然偶然与可能现实”只写成口号而不说明成立条件','记忆主线：原因和结果相互作用并可在具体关系中转换；必然通过偶然表现并为自己开辟道路；现实是已经实现的可能，可能转化为现实需要根据和条件。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_585651f54ad9a9c5cf',NULL,'subject_politics','ch_pol_my_phil','现象本质与内容形式','【核心命题】
现象是本质的外部表现，本质是事物稳定的内部联系；内容决定形式，形式反作用于内容并具有相对独立性。

【原理层次】
1. 透过现象把握本质需要实践和理论思维
2. 假象也是本质的一种歪曲表现
3. 适当形式促进内容发展
4. 形式主义是形式脱离内容

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 不能以个别现象直接概括本质
- 制度形式要适配实际内容
- 评价创新既看形式变化也看是否解决实质问题

【易错边界】
- 把“现象本质与内容形式”只写成口号而不说明成立条件
- 只背“透过现象把握本质需要实践和理论思维
- 假象也是本质的一种歪曲表现
- 适当形式促进内容发展
- 形式主义是形式脱离内容”而不建立因果链
- 材料分析忽略“透过现象把握本质需要实践和理论思维
- 假象也是本质的一种歪曲表现
- 适当形式促进内容发展
- 形式主义是形式脱离内容”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','现象是本质的外部表现，本质是事物稳定的内部联系；内容决定形式，形式反作用于内容并具有相对独立性。','high','high','2','["专项精讲", "考研政治", "principle"]','curated-politics-english-v3','25','【核心命题】
现象是本质的外部表现，本质是事物稳定的内部联系；内容决定形式，形式反作用于内容并具有相对独立性。

【原理层次】
1. 透过现象把握本质需要实践和理论思维
2. 假象也是本质的一种歪曲表现
3. 适当形式促进内容发展
4. 形式主义是形式脱离内容

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 不能以个别现象直接概括本质
- 制度形式要适配实际内容
- 评价创新既看形式变化也看是否解决实质问题

【易错边界】
- 把“现象本质与内容形式”只写成口号而不说明成立条件
- 只背“透过现象把握本质需要实践和理论思维
- 假象也是本质的一种歪曲表现
- 适当形式促进内容发展
- 形式主义是形式脱离内容”而不建立因果链
- 材料分析忽略“透过现象把握本质需要实践和理论思维
- 假象也是本质的一种歪曲表现
- 适当形式促进内容发展
- 形式主义是形式脱离内容”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 透过现象把握本质需要实践和理论思维
2. 假象也是本质的一种歪曲表现
3. 适当形式促进内容发展
4. 形式主义是形式脱离内容','材料角度1：不能以个别现象直接概括本质
材料角度2：制度形式要适配实际内容
材料角度3：评价创新既看形式变化也看是否解决实质问题','误区1：把“现象本质与内容形式”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“透过现象把握本质需要实践和理论思维。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：假象也是本质的一种歪曲表现。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：适当形式促进内容发展。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：形式主义是形式脱离内容”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“透过现象把握本质需要实践和理论思维。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：假象也是本质的一种歪曲表现。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：适当形式促进内容发展。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：形式主义是形式脱离内容”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“现象本质与内容形式”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “现象本质与内容形式”解决的核心问题是什么？
2. 写出三个关键关系：透过现象把握本质需要实践和理论思维；假象也是本质的一种歪曲表现；适当形式促进内容发展。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“现象本质与内容形式”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“现象本质与内容形式”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“现象本质与内容形式”只写成口号而不说明成立条件','记忆主线：现象是本质的外部表现，本质是事物稳定的内部联系；内容决定形式，形式反作用于内容并具有相对独立性。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_41d3fa28195f535935',NULL,'subject_politics','ch_pol_my_phil','感性认识与理性认识','【核心命题】
感性认识通过感觉、知觉和表象反映事物现象，理性认识通过概念、判断和推理把握本质规律；二者统一于实践。

【原理层次】
1. 感性认识是理性认识基础
2. 理性认识指导感性认识深化
3. 由感性到理性需要去粗取精去伪存真由此及彼由表及里
4. 理性认识必须回到实践

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 调查材料不能自动生成正确结论
- 理论学习不能替代实践经验
- 数据分析要经过概念化比较和因果判断

【易错边界】
- 把“感性认识与理性认识”只写成口号而不说明成立条件
- 只背“感性认识是理性认识基础
- 理性认识指导感性认识深化
- 由感性到理性需要去粗取精去伪存真由此及彼由表及里
- 理性认识必须回到实践”而不建立因果链
- 材料分析忽略“感性认识是理性认识基础
- 理性认识指导感性认识深化
- 由感性到理性需要去粗取精去伪存真由此及彼由表及里
- 理性认识必须回到实践”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','感性认识通过感觉、知觉和表象反映事物现象，理性认识通过概念、判断和推理把握本质规律；二者统一于实践。','high','high','2','["专项精讲", "考研政治", "principle"]','curated-politics-english-v3','26','【核心命题】
感性认识通过感觉、知觉和表象反映事物现象，理性认识通过概念、判断和推理把握本质规律；二者统一于实践。

【原理层次】
1. 感性认识是理性认识基础
2. 理性认识指导感性认识深化
3. 由感性到理性需要去粗取精去伪存真由此及彼由表及里
4. 理性认识必须回到实践

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 调查材料不能自动生成正确结论
- 理论学习不能替代实践经验
- 数据分析要经过概念化比较和因果判断

【易错边界】
- 把“感性认识与理性认识”只写成口号而不说明成立条件
- 只背“感性认识是理性认识基础
- 理性认识指导感性认识深化
- 由感性到理性需要去粗取精去伪存真由此及彼由表及里
- 理性认识必须回到实践”而不建立因果链
- 材料分析忽略“感性认识是理性认识基础
- 理性认识指导感性认识深化
- 由感性到理性需要去粗取精去伪存真由此及彼由表及里
- 理性认识必须回到实践”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 感性认识是理性认识基础
2. 理性认识指导感性认识深化
3. 由感性到理性需要去粗取精去伪存真由此及彼由表及里
4. 理性认识必须回到实践','材料角度1：调查材料不能自动生成正确结论
材料角度2：理论学习不能替代实践经验
材料角度3：数据分析要经过概念化比较和因果判断','误区1：把“感性认识与理性认识”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“感性认识是理性认识基础。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：理性认识指导感性认识深化。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：由感性到理性需要去粗取精去伪存真由此及彼由表及里。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：理性认识必须回到实践”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“感性认识是理性认识基础。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：理性认识指导感性认识深化。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：由感性到理性需要去粗取精去伪存真由此及彼由表及里。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：理性认识必须回到实践”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“感性认识与理性认识”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “感性认识与理性认识”解决的核心问题是什么？
2. 写出三个关键关系：感性认识是理性认识基础；理性认识指导感性认识深化；由感性到理性需要去粗取精去伪存真由此及彼由表及里。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“感性认识与理性认识”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“感性认识与理性认识”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“感性认识与理性认识”只写成口号而不说明成立条件','记忆主线：感性认识通过感觉、知觉和表象反映事物现象，理性认识通过概念、判断和推理把握本质规律；二者统一于实践。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_ff3af1416b70ad1445',NULL,'subject_politics','ch_pol_my_phil','真理的绝对性与相对性','【核心命题】
任何真理都包含不依赖人的客观内容并具有绝对性，同时受认识条件和对象范围限制而具有相对性；二者相互包含。

【原理层次】
1. 绝对性体现可认识性和客观内容
2. 相对性体现广度深度条件限制
3. 真理发展是由相对走向绝对的过程
4. 反对绝对主义和相对主义

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 科学结论可以修正不等于没有客观真理
- 政策适用有条件不等于任意解释
- 坚持真理与发展真理统一

【易错边界】
- 把“真理的绝对性与相对性”只写成口号而不说明成立条件
- 只背“绝对性体现可认识性和客观内容
- 相对性体现广度深度条件限制
- 真理发展是由相对走向绝对的过程
- 反对绝对主义和相对主义”而不建立因果链
- 材料分析忽略“绝对性体现可认识性和客观内容
- 相对性体现广度深度条件限制
- 真理发展是由相对走向绝对的过程
- 反对绝对主义和相对主义”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','任何真理都包含不依赖人的客观内容并具有绝对性，同时受认识条件和对象范围限制而具有相对性；二者相互包含。','high','high','2','["专项精讲", "考研政治", "principle"]','curated-politics-english-v3','27','【核心命题】
任何真理都包含不依赖人的客观内容并具有绝对性，同时受认识条件和对象范围限制而具有相对性；二者相互包含。

【原理层次】
1. 绝对性体现可认识性和客观内容
2. 相对性体现广度深度条件限制
3. 真理发展是由相对走向绝对的过程
4. 反对绝对主义和相对主义

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 科学结论可以修正不等于没有客观真理
- 政策适用有条件不等于任意解释
- 坚持真理与发展真理统一

【易错边界】
- 把“真理的绝对性与相对性”只写成口号而不说明成立条件
- 只背“绝对性体现可认识性和客观内容
- 相对性体现广度深度条件限制
- 真理发展是由相对走向绝对的过程
- 反对绝对主义和相对主义”而不建立因果链
- 材料分析忽略“绝对性体现可认识性和客观内容
- 相对性体现广度深度条件限制
- 真理发展是由相对走向绝对的过程
- 反对绝对主义和相对主义”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 绝对性体现可认识性和客观内容
2. 相对性体现广度深度条件限制
3. 真理发展是由相对走向绝对的过程
4. 反对绝对主义和相对主义','材料角度1：科学结论可以修正不等于没有客观真理
材料角度2：政策适用有条件不等于任意解释
材料角度3：坚持真理与发展真理统一','误区1：把“真理的绝对性与相对性”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“绝对性体现可认识性和客观内容。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：相对性体现广度深度条件限制。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：真理发展是由相对走向绝对的过程。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：反对绝对主义和相对主义”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“绝对性体现可认识性和客观内容。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：相对性体现广度深度条件限制。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：真理发展是由相对走向绝对的过程。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：反对绝对主义和相对主义”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“真理的绝对性与相对性”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “真理的绝对性与相对性”解决的核心问题是什么？
2. 写出三个关键关系：绝对性体现可认识性和客观内容；相对性体现广度深度条件限制；真理发展是由相对走向绝对的过程。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“真理的绝对性与相对性”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“真理的绝对性与相对性”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“真理的绝对性与相对性”只写成口号而不说明成立条件','记忆主线：任何真理都包含不依赖人的客观内容并具有绝对性，同时受认识条件和对象范围限制而具有相对性；二者相互包含。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_d8b3e2e0ca7af31e89',NULL,'subject_politics','ch_pol_my_phil','实践标准的确定性与不确定性','【核心命题】
实践是检验真理的唯一标准；其确定性在于只有实践能把主观认识与客观结果联系起来，不确定性在于具体实践具有历史局限。

【原理层次】
1. 实践检验具有最终权威
2. 一次实践不能穷尽复杂认识
3. 失败可能来自理论错误也可能来自条件不足
4. 实践标准与逻辑证明相互补充但不能替代

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 试点结果要结合范围和条件评估
- 短期效果不能完全证明长期规律
- 不能用主观认可代替实践效果

【易错边界】
- 把“实践标准的确定性与不确定性”只写成口号而不说明成立条件
- 只背“实践检验具有最终权威
- 一次实践不能穷尽复杂认识
- 失败可能来自理论错误也可能来自条件不足
- 实践标准与逻辑证明相互补充但不能替代”而不建立因果链
- 材料分析忽略“实践检验具有最终权威
- 一次实践不能穷尽复杂认识
- 失败可能来自理论错误也可能来自条件不足
- 实践标准与逻辑证明相互补充但不能替代”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','实践是检验真理的唯一标准；其确定性在于只有实践能把主观认识与客观结果联系起来，不确定性在于具体实践具有历史局限。','high','high','2','["专项精讲", "考研政治", "principle"]','curated-politics-english-v3','28','【核心命题】
实践是检验真理的唯一标准；其确定性在于只有实践能把主观认识与客观结果联系起来，不确定性在于具体实践具有历史局限。

【原理层次】
1. 实践检验具有最终权威
2. 一次实践不能穷尽复杂认识
3. 失败可能来自理论错误也可能来自条件不足
4. 实践标准与逻辑证明相互补充但不能替代

【方法论】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【材料映射】
- 试点结果要结合范围和条件评估
- 短期效果不能完全证明长期规律
- 不能用主观认可代替实践效果

【易错边界】
- 把“实践标准的确定性与不确定性”只写成口号而不说明成立条件
- 只背“实践检验具有最终权威
- 一次实践不能穷尽复杂认识
- 失败可能来自理论错误也可能来自条件不足
- 实践标准与逻辑证明相互补充但不能替代”而不建立因果链
- 材料分析忽略“实践检验具有最终权威
- 一次实践不能穷尽复杂认识
- 失败可能来自理论错误也可能来自条件不足
- 实践标准与逻辑证明相互补充但不能替代”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 实践检验具有最终权威
2. 一次实践不能穷尽复杂认识
3. 失败可能来自理论错误也可能来自条件不足
4. 实践标准与逻辑证明相互补充但不能替代','材料角度1：试点结果要结合范围和条件评估
材料角度2：短期效果不能完全证明长期规律
材料角度3：不能用主观认可代替实践效果','误区1：把“实践标准的确定性与不确定性”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“实践检验具有最终权威。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：一次实践不能穷尽复杂认识。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：失败可能来自理论错误也可能来自条件不足。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：实践标准与逻辑证明相互补充但不能替代”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“实践检验具有最终权威。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：一次实践不能穷尽复杂认识。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：失败可能来自理论错误也可能来自条件不足。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：实践标准与逻辑证明相互补充但不能替代”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“实践标准的确定性与不确定性”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “实践标准的确定性与不确定性”解决的核心问题是什么？
2. 写出三个关键关系：实践检验具有最终权威；一次实践不能穷尽复杂认识；失败可能来自理论错误也可能来自条件不足。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“实践标准的确定性与不确定性”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“实践标准的确定性与不确定性”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“实践标准的确定性与不确定性”只写成口号而不说明成立条件','记忆主线：实践是检验真理的唯一标准；其确定性在于只有实践能把主观认识与客观结果联系起来，不确定性在于具体实践具有历史局限。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_f6ab8307cc741af1bb',NULL,'subject_politics','ch_pol_my_phil','生产力与生产关系','【核心命题】
生产力是人们解决社会同自然矛盾的实际能力，生产关系是生产过程中形成的经济关系；生产力决定生产关系，生产关系反作用于生产力。

【结构关系】
1. 生产力包括劳动者劳动资料劳动对象及科技因素
2. 生产关系包括所有制地位和分配关系
3. 适合时促进，不适合时阻碍
4. 改革是调整不适应环节

【作用机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【改革分析】
- 评价制度改革要看是否解放发展生产力
- 技术进步会提出制度调整要求
- 不能把生产关系作用夸大为脱离生产力的决定力量

【易错边界】
- 把“生产力与生产关系”只写成口号而不说明成立条件
- 只背“生产力包括劳动者劳动资料劳动对象及科技因素
- 生产关系包括所有制地位和分配关系
- 适合时促进，不适合时阻碍
- 改革是调整不适应环节”而不建立因果链
- 材料分析忽略“生产力包括劳动者劳动资料劳动对象及科技因素
- 生产关系包括所有制地位和分配关系
- 适合时促进，不适合时阻碍
- 改革是调整不适应环节”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','生产力是人们解决社会同自然矛盾的实际能力，生产关系是生产过程中形成的经济关系；生产力决定生产关系，生产关系反作用于生产力。','high','high','2','["专项精讲", "考研政治", "society"]','curated-politics-english-v3','29','【核心命题】
生产力是人们解决社会同自然矛盾的实际能力，生产关系是生产过程中形成的经济关系；生产力决定生产关系，生产关系反作用于生产力。

【结构关系】
1. 生产力包括劳动者劳动资料劳动对象及科技因素
2. 生产关系包括所有制地位和分配关系
3. 适合时促进，不适合时阻碍
4. 改革是调整不适应环节

【作用机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【改革分析】
- 评价制度改革要看是否解放发展生产力
- 技术进步会提出制度调整要求
- 不能把生产关系作用夸大为脱离生产力的决定力量

【易错边界】
- 把“生产力与生产关系”只写成口号而不说明成立条件
- 只背“生产力包括劳动者劳动资料劳动对象及科技因素
- 生产关系包括所有制地位和分配关系
- 适合时促进，不适合时阻碍
- 改革是调整不适应环节”而不建立因果链
- 材料分析忽略“生产力包括劳动者劳动资料劳动对象及科技因素
- 生产关系包括所有制地位和分配关系
- 适合时促进，不适合时阻碍
- 改革是调整不适应环节”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 生产力包括劳动者劳动资料劳动对象及科技因素
2. 生产关系包括所有制地位和分配关系
3. 适合时促进，不适合时阻碍
4. 改革是调整不适应环节','材料角度1：评价制度改革要看是否解放发展生产力
材料角度2：技术进步会提出制度调整要求
材料角度3：不能把生产关系作用夸大为脱离生产力的决定力量','误区1：把“生产力与生产关系”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“生产力包括劳动者劳动资料劳动对象及科技因素。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：生产关系包括所有制地位和分配关系。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：适合时促进，不适合时阻碍。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：改革是调整不适应环节”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“生产力包括劳动者劳动资料劳动对象及科技因素。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：生产关系包括所有制地位和分配关系。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：适合时促进，不适合时阻碍。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：改革是调整不适应环节”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“生产力与生产关系”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “生产力与生产关系”解决的核心问题是什么？
2. 写出三个关键关系：生产力包括劳动者劳动资料劳动对象及科技因素；生产关系包括所有制地位和分配关系；适合时促进，不适合时阻碍。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“生产力与生产关系”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“生产力与生产关系”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“生产力与生产关系”只写成口号而不说明成立条件','记忆主线：生产力是人们解决社会同自然矛盾的实际能力，生产关系是生产过程中形成的经济关系；生产力决定生产关系，生产关系反作用于生产力。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_cf6ef7021fb6c0bea5',NULL,'subject_politics','ch_pol_my_phil','经济基础与上层建筑','【核心命题】
经济基础是一定社会占统治地位的生产关系总和，上层建筑包括政治法律制度设施和社会意识形态；经济基础决定上层建筑，上层建筑反作用于经济基础。

【结构关系】
1. 上层建筑具有相对独立性
2. 政治上层建筑通常居主导
3. 适合经济基础时服务巩固，反之阻碍
4. 改革需统筹经济体制与政治法律文化建设

【作用机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【改革分析】
- 法治建设既受经济社会条件制约又能稳定预期
- 文化观念变化可能滞后于经济结构
- 不能把上层建筑简化为被动反映

【易错边界】
- 把“经济基础与上层建筑”只写成口号而不说明成立条件
- 只背“上层建筑具有相对独立性
- 政治上层建筑通常居主导
- 适合经济基础时服务巩固，反之阻碍
- 改革需统筹经济体制与政治法律文化建设”而不建立因果链
- 材料分析忽略“上层建筑具有相对独立性
- 政治上层建筑通常居主导
- 适合经济基础时服务巩固，反之阻碍
- 改革需统筹经济体制与政治法律文化建设”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','经济基础是一定社会占统治地位的生产关系总和，上层建筑包括政治法律制度设施和社会意识形态；经济基础决定上层建筑，上层建筑反作用于经济基础。','high','high','2','["专项精讲", "考研政治", "society"]','curated-politics-english-v3','30','【核心命题】
经济基础是一定社会占统治地位的生产关系总和，上层建筑包括政治法律制度设施和社会意识形态；经济基础决定上层建筑，上层建筑反作用于经济基础。

【结构关系】
1. 上层建筑具有相对独立性
2. 政治上层建筑通常居主导
3. 适合经济基础时服务巩固，反之阻碍
4. 改革需统筹经济体制与政治法律文化建设

【作用机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【改革分析】
- 法治建设既受经济社会条件制约又能稳定预期
- 文化观念变化可能滞后于经济结构
- 不能把上层建筑简化为被动反映

【易错边界】
- 把“经济基础与上层建筑”只写成口号而不说明成立条件
- 只背“上层建筑具有相对独立性
- 政治上层建筑通常居主导
- 适合经济基础时服务巩固，反之阻碍
- 改革需统筹经济体制与政治法律文化建设”而不建立因果链
- 材料分析忽略“上层建筑具有相对独立性
- 政治上层建筑通常居主导
- 适合经济基础时服务巩固，反之阻碍
- 改革需统筹经济体制与政治法律文化建设”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 上层建筑具有相对独立性
2. 政治上层建筑通常居主导
3. 适合经济基础时服务巩固，反之阻碍
4. 改革需统筹经济体制与政治法律文化建设','材料角度1：法治建设既受经济社会条件制约又能稳定预期
材料角度2：文化观念变化可能滞后于经济结构
材料角度3：不能把上层建筑简化为被动反映','误区1：把“经济基础与上层建筑”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“上层建筑具有相对独立性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：政治上层建筑通常居主导。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：适合经济基础时服务巩固，反之阻碍。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：改革需统筹经济体制与政治法律文化建设”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“上层建筑具有相对独立性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：政治上层建筑通常居主导。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：适合经济基础时服务巩固，反之阻碍。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：改革需统筹经济体制与政治法律文化建设”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“经济基础与上层建筑”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “经济基础与上层建筑”解决的核心问题是什么？
2. 写出三个关键关系：上层建筑具有相对独立性；政治上层建筑通常居主导；适合经济基础时服务巩固，反之阻碍。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“经济基础与上层建筑”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“经济基础与上层建筑”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“经济基础与上层建筑”只写成口号而不说明成立条件','记忆主线：经济基础是一定社会占统治地位的生产关系总和，上层建筑包括政治法律制度设施和社会意识形态；经济基础决定上层建筑，上层建筑反作用于经济基础。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_1c27064b29c6582b10',NULL,'subject_politics','ch_pol_my_pe','私人劳动与社会劳动','【核心命题】
商品生产条件下，私人劳动要通过交换转化为社会劳动；这一矛盾是简单商品经济基本矛盾，也是商品拜物教和市场风险的重要根源。

【概念与公式】
1. 私人劳动具有独立性
2. 社会劳动体现社会分工要求
3. 交换成功说明个别劳动得到社会承认
4. 供求偏离会造成价值实现困难

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 产品卖不出去意味着私人劳动未充分转化为社会劳动
- 市场调节通过价格信号事后实现社会劳动分配

【易错边界】
- 把“私人劳动与社会劳动”只写成口号而不说明成立条件
- 只背“私人劳动具有独立性
- 社会劳动体现社会分工要求
- 交换成功说明个别劳动得到社会承认
- 供求偏离会造成价值实现困难”而不建立因果链
- 材料分析忽略“私人劳动具有独立性
- 社会劳动体现社会分工要求
- 交换成功说明个别劳动得到社会承认
- 供求偏离会造成价值实现困难”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','商品生产条件下，私人劳动要通过交换转化为社会劳动；这一矛盾是简单商品经济基本矛盾，也是商品拜物教和市场风险的重要根源。','high','high','2','["专项精讲", "考研政治", "economy"]','curated-politics-english-v3','13','【核心命题】
商品生产条件下，私人劳动要通过交换转化为社会劳动；这一矛盾是简单商品经济基本矛盾，也是商品拜物教和市场风险的重要根源。

【概念与公式】
1. 私人劳动具有独立性
2. 社会劳动体现社会分工要求
3. 交换成功说明个别劳动得到社会承认
4. 供求偏离会造成价值实现困难

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 产品卖不出去意味着私人劳动未充分转化为社会劳动
- 市场调节通过价格信号事后实现社会劳动分配

【易错边界】
- 把“私人劳动与社会劳动”只写成口号而不说明成立条件
- 只背“私人劳动具有独立性
- 社会劳动体现社会分工要求
- 交换成功说明个别劳动得到社会承认
- 供求偏离会造成价值实现困难”而不建立因果链
- 材料分析忽略“私人劳动具有独立性
- 社会劳动体现社会分工要求
- 交换成功说明个别劳动得到社会承认
- 供求偏离会造成价值实现困难”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 私人劳动具有独立性
2. 社会劳动体现社会分工要求
3. 交换成功说明个别劳动得到社会承认
4. 供求偏离会造成价值实现困难','材料角度1：产品卖不出去意味着私人劳动未充分转化为社会劳动
材料角度2：市场调节通过价格信号事后实现社会劳动分配','误区1：把“私人劳动与社会劳动”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“私人劳动具有独立性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：社会劳动体现社会分工要求。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：交换成功说明个别劳动得到社会承认。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：供求偏离会造成价值实现困难”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“私人劳动具有独立性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：社会劳动体现社会分工要求。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：交换成功说明个别劳动得到社会承认。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：供求偏离会造成价值实现困难”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“私人劳动与社会劳动”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “私人劳动与社会劳动”解决的核心问题是什么？
2. 写出三个关键关系：私人劳动具有独立性；社会劳动体现社会分工要求；交换成功说明个别劳动得到社会承认。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“私人劳动与社会劳动”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“私人劳动与社会劳动”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“私人劳动与社会劳动”只写成口号而不说明成立条件','记忆主线：商品生产条件下，私人劳动要通过交换转化为社会劳动；这一矛盾是简单商品经济基本矛盾，也是商品拜物教和市场风险的重要根源。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_eb3617c5b92cc362b9',NULL,'subject_politics','ch_pol_my_pe','价值规律','【核心命题】
价值规律要求商品价值量由社会必要劳动时间决定，商品交换以价值量为基础实行等价交换；价格围绕价值波动是其表现形式。

【概念与公式】
1. 调节生产资料和劳动力分配
2. 刺激技术改进和劳动生产率提高
3. 造成优胜劣汰和分化
4. 供求影响价格但不决定价值

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 价格上涨可能来自供不应求但价值仍由劳动决定
- 企业提高个别劳动生产率可获得超额收益

【易错边界】
- 把“价值规律”只写成口号而不说明成立条件
- 只背“调节生产资料和劳动力分配
- 刺激技术改进和劳动生产率提高
- 造成优胜劣汰和分化
- 供求影响价格但不决定价值”而不建立因果链
- 材料分析忽略“调节生产资料和劳动力分配
- 刺激技术改进和劳动生产率提高
- 造成优胜劣汰和分化
- 供求影响价格但不决定价值”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','价值规律要求商品价值量由社会必要劳动时间决定，商品交换以价值量为基础实行等价交换；价格围绕价值波动是其表现形式。','high','high','2','["专项精讲", "考研政治", "economy"]','curated-politics-english-v3','14','【核心命题】
价值规律要求商品价值量由社会必要劳动时间决定，商品交换以价值量为基础实行等价交换；价格围绕价值波动是其表现形式。

【概念与公式】
1. 调节生产资料和劳动力分配
2. 刺激技术改进和劳动生产率提高
3. 造成优胜劣汰和分化
4. 供求影响价格但不决定价值

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 价格上涨可能来自供不应求但价值仍由劳动决定
- 企业提高个别劳动生产率可获得超额收益

【易错边界】
- 把“价值规律”只写成口号而不说明成立条件
- 只背“调节生产资料和劳动力分配
- 刺激技术改进和劳动生产率提高
- 造成优胜劣汰和分化
- 供求影响价格但不决定价值”而不建立因果链
- 材料分析忽略“调节生产资料和劳动力分配
- 刺激技术改进和劳动生产率提高
- 造成优胜劣汰和分化
- 供求影响价格但不决定价值”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 调节生产资料和劳动力分配
2. 刺激技术改进和劳动生产率提高
3. 造成优胜劣汰和分化
4. 供求影响价格但不决定价值','材料角度1：价格上涨可能来自供不应求但价值仍由劳动决定
材料角度2：企业提高个别劳动生产率可获得超额收益','误区1：把“价值规律”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“调节生产资料和劳动力分配。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：刺激技术改进和劳动生产率提高。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：造成优胜劣汰和分化。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：供求影响价格但不决定价值”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“调节生产资料和劳动力分配。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：刺激技术改进和劳动生产率提高。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：造成优胜劣汰和分化。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：供求影响价格但不决定价值”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“价值规律”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “价值规律”解决的核心问题是什么？
2. 写出三个关键关系：调节生产资料和劳动力分配；刺激技术改进和劳动生产率提高；造成优胜劣汰和分化。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“价值规律”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“价值规律”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“价值规律”只写成口号而不说明成立条件','记忆主线：价值规律要求商品价值量由社会必要劳动时间决定，商品交换以价值量为基础实行等价交换；价格围绕价值波动是其表现形式。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_cdb248810af2e8db52',NULL,'subject_politics','ch_pol_my_pe','不变资本、可变资本与剩余价值率','【核心命题】
不变资本用于生产资料，只转移旧价值；可变资本用于购买劳动力并在生产中创造新价值；剩余价值率m''=m/v反映资本家对工人的剥削程度。

【概念与公式】
1. 划分依据是资本不同部分在剩余价值生产中的作用
2. 工资表现为劳动价格但实质是劳动力价值
3. 剩余价值由可变资本带来
4. 利润率与剩余价值率不同

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 机器提高生产率但不直接创造剩余价值
- 把全部预付资本作为剩余价值来源会掩盖劳资关系

【易错边界】
- 把“不变资本、可变资本与剩余价值率”只写成口号而不说明成立条件
- 只背“划分依据是资本不同部分在剩余价值生产中的作用
- 工资表现为劳动价格但实质是劳动力价值
- 剩余价值由可变资本带来
- 利润率与剩余价值率不同”而不建立因果链
- 材料分析忽略“划分依据是资本不同部分在剩余价值生产中的作用
- 工资表现为劳动价格但实质是劳动力价值
- 剩余价值由可变资本带来
- 利润率与剩余价值率不同”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','不变资本用于生产资料，只转移旧价值；可变资本用于购买劳动力并在生产中创造新价值；剩余价值率m''=m/v反映资本家对工人的剥削程度。','high','high','2','["专项精讲", "考研政治", "economy"]','curated-politics-english-v3','15','【核心命题】
不变资本用于生产资料，只转移旧价值；可变资本用于购买劳动力并在生产中创造新价值；剩余价值率m''=m/v反映资本家对工人的剥削程度。

【概念与公式】
1. 划分依据是资本不同部分在剩余价值生产中的作用
2. 工资表现为劳动价格但实质是劳动力价值
3. 剩余价值由可变资本带来
4. 利润率与剩余价值率不同

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 机器提高生产率但不直接创造剩余价值
- 把全部预付资本作为剩余价值来源会掩盖劳资关系

【易错边界】
- 把“不变资本、可变资本与剩余价值率”只写成口号而不说明成立条件
- 只背“划分依据是资本不同部分在剩余价值生产中的作用
- 工资表现为劳动价格但实质是劳动力价值
- 剩余价值由可变资本带来
- 利润率与剩余价值率不同”而不建立因果链
- 材料分析忽略“划分依据是资本不同部分在剩余价值生产中的作用
- 工资表现为劳动价格但实质是劳动力价值
- 剩余价值由可变资本带来
- 利润率与剩余价值率不同”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 划分依据是资本不同部分在剩余价值生产中的作用
2. 工资表现为劳动价格但实质是劳动力价值
3. 剩余价值由可变资本带来
4. 利润率与剩余价值率不同','材料角度1：机器提高生产率但不直接创造剩余价值
材料角度2：把全部预付资本作为剩余价值来源会掩盖劳资关系','误区1：把“不变资本、可变资本与剩余价值率”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“划分依据是资本不同部分在剩余价值生产中的作用。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：工资表现为劳动价格但实质是劳动力价值。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：剩余价值由可变资本带来。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：利润率与剩余价值率不同”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“划分依据是资本不同部分在剩余价值生产中的作用。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：工资表现为劳动价格但实质是劳动力价值。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：剩余价值由可变资本带来。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：利润率与剩余价值率不同”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“不变资本、可变资本与剩余价值率”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “不变资本、可变资本与剩余价值率”解决的核心问题是什么？
2. 写出三个关键关系：划分依据是资本不同部分在剩余价值生产中的作用；工资表现为劳动价格但实质是劳动力价值；剩余价值由可变资本带来。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“不变资本、可变资本与剩余价值率”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“不变资本、可变资本与剩余价值率”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“不变资本、可变资本与剩余价值率”只写成口号而不说明成立条件','记忆主线：不变资本用于生产资料，只转移旧价值；可变资本用于购买劳动力并在生产中创造新价值；剩余价值率m''=m/v反映资本家对工人的剥削程度。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_e2236cc78db950fbff',NULL,'subject_politics','ch_pol_my_pe','绝对剩余价值与相对剩余价值','【核心命题】
绝对剩余价值通过延长工作日或提高劳动强度增加剩余劳动时间；相对剩余价值通过提高社会劳动生产率缩短必要劳动时间。

【概念与公式】
1. 两种方法都以劳动力价值和工作日划分为前提
2. 相对剩余价值依赖生活资料部门生产率提高
3. 单个企业超额剩余价值推动全社会技术进步

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 个别企业创新先获得超额剩余价值
- 普遍推广后商品社会价值下降并形成相对剩余价值条件

【易错边界】
- 把“绝对剩余价值与相对剩余价值”只写成口号而不说明成立条件
- 只背“两种方法都以劳动力价值和工作日划分为前提
- 相对剩余价值依赖生活资料部门生产率提高
- 单个企业超额剩余价值推动全社会技术进步”而不建立因果链
- 材料分析忽略“两种方法都以劳动力价值和工作日划分为前提
- 相对剩余价值依赖生活资料部门生产率提高
- 单个企业超额剩余价值推动全社会技术进步”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','绝对剩余价值通过延长工作日或提高劳动强度增加剩余劳动时间；相对剩余价值通过提高社会劳动生产率缩短必要劳动时间。','high','high','2','["专项精讲", "考研政治", "economy"]','curated-politics-english-v3','16','【核心命题】
绝对剩余价值通过延长工作日或提高劳动强度增加剩余劳动时间；相对剩余价值通过提高社会劳动生产率缩短必要劳动时间。

【概念与公式】
1. 两种方法都以劳动力价值和工作日划分为前提
2. 相对剩余价值依赖生活资料部门生产率提高
3. 单个企业超额剩余价值推动全社会技术进步

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 个别企业创新先获得超额剩余价值
- 普遍推广后商品社会价值下降并形成相对剩余价值条件

【易错边界】
- 把“绝对剩余价值与相对剩余价值”只写成口号而不说明成立条件
- 只背“两种方法都以劳动力价值和工作日划分为前提
- 相对剩余价值依赖生活资料部门生产率提高
- 单个企业超额剩余价值推动全社会技术进步”而不建立因果链
- 材料分析忽略“两种方法都以劳动力价值和工作日划分为前提
- 相对剩余价值依赖生活资料部门生产率提高
- 单个企业超额剩余价值推动全社会技术进步”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 两种方法都以劳动力价值和工作日划分为前提
2. 相对剩余价值依赖生活资料部门生产率提高
3. 单个企业超额剩余价值推动全社会技术进步','材料角度1：个别企业创新先获得超额剩余价值
材料角度2：普遍推广后商品社会价值下降并形成相对剩余价值条件','误区1：把“绝对剩余价值与相对剩余价值”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“两种方法都以劳动力价值和工作日划分为前提。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：相对剩余价值依赖生活资料部门生产率提高。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：单个企业超额剩余价值推动全社会技术进步”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：材料分析忽略“两种方法都以劳动力价值和工作日划分为前提。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：相对剩余价值依赖生活资料部门生产率提高。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：单个企业超额剩余价值推动全社会技术进步”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“绝对剩余价值与相对剩余价值”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “绝对剩余价值与相对剩余价值”解决的核心问题是什么？
2. 写出三个关键关系：两种方法都以劳动力价值和工作日划分为前提；相对剩余价值依赖生活资料部门生产率提高；单个企业超额剩余价值推动全社会技术进步。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“绝对剩余价值与相对剩余价值”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“绝对剩余价值与相对剩余价值”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“绝对剩余价值与相对剩余价值”只写成口号而不说明成立条件','记忆主线：绝对剩余价值通过延长工作日或提高劳动强度增加剩余劳动时间；相对剩余价值通过提高社会劳动生产率缩短必要劳动时间。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_b8daeae00b83675842',NULL,'subject_politics','ch_pol_my_pe','资本有机构成与相对人口过剩','【核心命题】
资本有机构成是由技术构成决定并反映其变化的价值构成c:v；积累和技术进步通常提高资本有机构成，造成劳动力需求相对下降。

【概念与公式】
1. 资本积聚和集中扩大资本规模
2. 可变资本绝对量可增加但相对比重下降
3. 相对过剩人口是资本积累产物
4. 失业压力反过来影响工资

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 技术进步不等于人口绝对多余
- 相对过剩是相对于资本增殖需要
- 分析就业要同时看产业扩张和结构替代

【易错边界】
- 把“资本有机构成与相对人口过剩”只写成口号而不说明成立条件
- 只背“资本积聚和集中扩大资本规模
- 可变资本绝对量可增加但相对比重下降
- 相对过剩人口是资本积累产物
- 失业压力反过来影响工资”而不建立因果链
- 材料分析忽略“资本积聚和集中扩大资本规模
- 可变资本绝对量可增加但相对比重下降
- 相对过剩人口是资本积累产物
- 失业压力反过来影响工资”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','资本有机构成是由技术构成决定并反映其变化的价值构成c:v；积累和技术进步通常提高资本有机构成，造成劳动力需求相对下降。','high','high','2','["专项精讲", "考研政治", "economy"]','curated-politics-english-v3','17','【核心命题】
资本有机构成是由技术构成决定并反映其变化的价值构成c:v；积累和技术进步通常提高资本有机构成，造成劳动力需求相对下降。

【概念与公式】
1. 资本积聚和集中扩大资本规模
2. 可变资本绝对量可增加但相对比重下降
3. 相对过剩人口是资本积累产物
4. 失业压力反过来影响工资

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 技术进步不等于人口绝对多余
- 相对过剩是相对于资本增殖需要
- 分析就业要同时看产业扩张和结构替代

【易错边界】
- 把“资本有机构成与相对人口过剩”只写成口号而不说明成立条件
- 只背“资本积聚和集中扩大资本规模
- 可变资本绝对量可增加但相对比重下降
- 相对过剩人口是资本积累产物
- 失业压力反过来影响工资”而不建立因果链
- 材料分析忽略“资本积聚和集中扩大资本规模
- 可变资本绝对量可增加但相对比重下降
- 相对过剩人口是资本积累产物
- 失业压力反过来影响工资”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 资本积聚和集中扩大资本规模
2. 可变资本绝对量可增加但相对比重下降
3. 相对过剩人口是资本积累产物
4. 失业压力反过来影响工资','材料角度1：技术进步不等于人口绝对多余
材料角度2：相对过剩是相对于资本增殖需要
材料角度3：分析就业要同时看产业扩张和结构替代','误区1：把“资本有机构成与相对人口过剩”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“资本积聚和集中扩大资本规模。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：可变资本绝对量可增加但相对比重下降。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：相对过剩人口是资本积累产物。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：失业压力反过来影响工资”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“资本积聚和集中扩大资本规模。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：可变资本绝对量可增加但相对比重下降。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：相对过剩人口是资本积累产物。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：失业压力反过来影响工资”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“资本有机构成与相对人口过剩”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “资本有机构成与相对人口过剩”解决的核心问题是什么？
2. 写出三个关键关系：资本积聚和集中扩大资本规模；可变资本绝对量可增加但相对比重下降；相对过剩人口是资本积累产物。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“资本有机构成与相对人口过剩”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“资本有机构成与相对人口过剩”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“资本有机构成与相对人口过剩”只写成口号而不说明成立条件','记忆主线：资本有机构成是由技术构成决定并反映其变化的价值构成c:v；积累和技术进步通常提高资本有机构成，造成劳动力需求相对下降。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_466709611b197e52e0',NULL,'subject_politics','ch_pol_my_pe','资本主义经济危机','【核心命题】
资本主义经济危机的实质是生产相对过剩，根源在生产社会化与资本主义私人占有之间的基本矛盾。

【概念与公式】
1. 个别企业生产有组织而全社会生产无政府
2. 生产无限扩大趋势与劳动群众有支付能力需求相对缩小冲突
3. 危机具有周期性
4. 危机暂时强制恢复比例关系

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 库存积压与购买力不足是表象
- 不能把危机解释为商品绝对过多
- 金融冲击可成为导火索但不是根本原因

【易错边界】
- 把“资本主义经济危机”只写成口号而不说明成立条件
- 只背“个别企业生产有组织而全社会生产无政府
- 生产无限扩大趋势与劳动群众有支付能力需求相对缩小冲突
- 危机具有周期性
- 危机暂时强制恢复比例关系”而不建立因果链
- 材料分析忽略“个别企业生产有组织而全社会生产无政府
- 生产无限扩大趋势与劳动群众有支付能力需求相对缩小冲突
- 危机具有周期性
- 危机暂时强制恢复比例关系”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','资本主义经济危机的实质是生产相对过剩，根源在生产社会化与资本主义私人占有之间的基本矛盾。','high','high','2','["专项精讲", "考研政治", "economy"]','curated-politics-english-v3','18','【核心命题】
资本主义经济危机的实质是生产相对过剩，根源在生产社会化与资本主义私人占有之间的基本矛盾。

【概念与公式】
1. 个别企业生产有组织而全社会生产无政府
2. 生产无限扩大趋势与劳动群众有支付能力需求相对缩小冲突
3. 危机具有周期性
4. 危机暂时强制恢复比例关系

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 库存积压与购买力不足是表象
- 不能把危机解释为商品绝对过多
- 金融冲击可成为导火索但不是根本原因

【易错边界】
- 把“资本主义经济危机”只写成口号而不说明成立条件
- 只背“个别企业生产有组织而全社会生产无政府
- 生产无限扩大趋势与劳动群众有支付能力需求相对缩小冲突
- 危机具有周期性
- 危机暂时强制恢复比例关系”而不建立因果链
- 材料分析忽略“个别企业生产有组织而全社会生产无政府
- 生产无限扩大趋势与劳动群众有支付能力需求相对缩小冲突
- 危机具有周期性
- 危机暂时强制恢复比例关系”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 个别企业生产有组织而全社会生产无政府
2. 生产无限扩大趋势与劳动群众有支付能力需求相对缩小冲突
3. 危机具有周期性
4. 危机暂时强制恢复比例关系','材料角度1：库存积压与购买力不足是表象
材料角度2：不能把危机解释为商品绝对过多
材料角度3：金融冲击可成为导火索但不是根本原因','误区1：把“资本主义经济危机”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“个别企业生产有组织而全社会生产无政府。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：生产无限扩大趋势与劳动群众有支付能力需求相对缩小冲突。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：危机具有周期性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：危机暂时强制恢复比例关系”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“个别企业生产有组织而全社会生产无政府。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：生产无限扩大趋势与劳动群众有支付能力需求相对缩小冲突。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：危机具有周期性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：危机暂时强制恢复比例关系”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“资本主义经济危机”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “资本主义经济危机”解决的核心问题是什么？
2. 写出三个关键关系：个别企业生产有组织而全社会生产无政府；生产无限扩大趋势与劳动群众有支付能力需求相对缩小冲突；危机具有周期性。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“资本主义经济危机”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“资本主义经济危机”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“资本主义经济危机”只写成口号而不说明成立条件','记忆主线：资本主义经济危机的实质是生产相对过剩，根源在生产社会化与资本主义私人占有之间的基本矛盾。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_f299812b3ddf7e86cc',NULL,'subject_politics','ch_pol_my_pe','垄断利润、垄断价格与金融资本','【核心命题】
垄断组织凭借经济地位获得超过平均利润的垄断利润，并通过垄断价格、金融控制和对外扩张实现；垄断不能消除竞争和价值规律。

【概念与公式】
1. 垄断价格包括垄断高价和低价
2. 垄断利润最终来自劳动者创造价值和再分配
3. 银行资本与工业资本融合形成金融资本
4. 金融寡头通过参与制等控制经济

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 垄断价格不意味着价值规律失效
- 垄断与竞争并存且竞争更激烈
- 利润来源不能归因于纯粹价格技巧

【易错边界】
- 把“垄断利润、垄断价格与金融资本”只写成口号而不说明成立条件
- 只背“垄断价格包括垄断高价和低价
- 垄断利润最终来自劳动者创造价值和再分配
- 银行资本与工业资本融合形成金融资本
- 金融寡头通过参与制等控制经济”而不建立因果链
- 材料分析忽略“垄断价格包括垄断高价和低价
- 垄断利润最终来自劳动者创造价值和再分配
- 银行资本与工业资本融合形成金融资本
- 金融寡头通过参与制等控制经济”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','垄断组织凭借经济地位获得超过平均利润的垄断利润，并通过垄断价格、金融控制和对外扩张实现；垄断不能消除竞争和价值规律。','high','high','2','["专项精讲", "考研政治", "economy"]','curated-politics-english-v3','19','【核心命题】
垄断组织凭借经济地位获得超过平均利润的垄断利润，并通过垄断价格、金融控制和对外扩张实现；垄断不能消除竞争和价值规律。

【概念与公式】
1. 垄断价格包括垄断高价和低价
2. 垄断利润最终来自劳动者创造价值和再分配
3. 银行资本与工业资本融合形成金融资本
4. 金融寡头通过参与制等控制经济

【运行机制】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现象解释】
- 垄断价格不意味着价值规律失效
- 垄断与竞争并存且竞争更激烈
- 利润来源不能归因于纯粹价格技巧

【易错边界】
- 把“垄断利润、垄断价格与金融资本”只写成口号而不说明成立条件
- 只背“垄断价格包括垄断高价和低价
- 垄断利润最终来自劳动者创造价值和再分配
- 银行资本与工业资本融合形成金融资本
- 金融寡头通过参与制等控制经济”而不建立因果链
- 材料分析忽略“垄断价格包括垄断高价和低价
- 垄断利润最终来自劳动者创造价值和再分配
- 银行资本与工业资本融合形成金融资本
- 金融寡头通过参与制等控制经济”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 垄断价格包括垄断高价和低价
2. 垄断利润最终来自劳动者创造价值和再分配
3. 银行资本与工业资本融合形成金融资本
4. 金融寡头通过参与制等控制经济','材料角度1：垄断价格不意味着价值规律失效
材料角度2：垄断与竞争并存且竞争更激烈
材料角度3：利润来源不能归因于纯粹价格技巧','误区1：把“垄断利润、垄断价格与金融资本”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“垄断价格包括垄断高价和低价。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：垄断利润最终来自劳动者创造价值和再分配。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：银行资本与工业资本融合形成金融资本。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：金融寡头通过参与制等控制经济”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“垄断价格包括垄断高价和低价。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：垄断利润最终来自劳动者创造价值和再分配。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：银行资本与工业资本融合形成金融资本。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：金融寡头通过参与制等控制经济”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“垄断利润、垄断价格与金融资本”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “垄断利润、垄断价格与金融资本”解决的核心问题是什么？
2. 写出三个关键关系：垄断价格包括垄断高价和低价；垄断利润最终来自劳动者创造价值和再分配；银行资本与工业资本融合形成金融资本。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“垄断利润、垄断价格与金融资本”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“垄断利润、垄断价格与金融资本”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“垄断利润、垄断价格与金融资本”只写成口号而不说明成立条件','记忆主线：垄断组织凭借经济地位获得超过平均利润的垄断利润，并通过垄断价格、金融控制和对外扩张实现；垄断不能消除竞争和价值规律。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_f5cde882b04aafb669',NULL,'subject_politics','ch_pol_my_soc','社会主义发展道路的多样性','【核心命题】
各国走向社会主义必须遵循科学社会主义基本原则，又要同本国历史文化、发展阶段和现实条件结合，因而道路具有多样性。

【基本原则】
1. 基本原则与具体道路统一
2. 不能照搬外国模式
3. 实践探索允许曲折
4. 评价道路要看是否解放生产力、改善人民生活并巩固制度

【道路条件】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【评价尺度】
- 多样性不等于放弃共同理想
- 坚持原则不等于模式唯一
- 改革是制度自我完善而非否定根本制度

【易错边界】
- 把“社会主义发展道路的多样性”只写成口号而不说明成立条件
- 只背“基本原则与具体道路统一
- 不能照搬外国模式
- 实践探索允许曲折
- 评价道路要看是否解放生产力、改善人民生活并巩固制度”而不建立因果链
- 材料分析忽略“基本原则与具体道路统一
- 不能照搬外国模式
- 实践探索允许曲折
- 评价道路要看是否解放生产力、改善人民生活并巩固制度”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','各国走向社会主义必须遵循科学社会主义基本原则，又要同本国历史文化、发展阶段和现实条件结合，因而道路具有多样性。','high','high','2','["专项精讲", "考研政治", "socialism"]','curated-politics-english-v3','9','【核心命题】
各国走向社会主义必须遵循科学社会主义基本原则，又要同本国历史文化、发展阶段和现实条件结合，因而道路具有多样性。

【基本原则】
1. 基本原则与具体道路统一
2. 不能照搬外国模式
3. 实践探索允许曲折
4. 评价道路要看是否解放生产力、改善人民生活并巩固制度

【道路条件】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【评价尺度】
- 多样性不等于放弃共同理想
- 坚持原则不等于模式唯一
- 改革是制度自我完善而非否定根本制度

【易错边界】
- 把“社会主义发展道路的多样性”只写成口号而不说明成立条件
- 只背“基本原则与具体道路统一
- 不能照搬外国模式
- 实践探索允许曲折
- 评价道路要看是否解放生产力、改善人民生活并巩固制度”而不建立因果链
- 材料分析忽略“基本原则与具体道路统一
- 不能照搬外国模式
- 实践探索允许曲折
- 评价道路要看是否解放生产力、改善人民生活并巩固制度”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 基本原则与具体道路统一
2. 不能照搬外国模式
3. 实践探索允许曲折
4. 评价道路要看是否解放生产力、改善人民生活并巩固制度','材料角度1：多样性不等于放弃共同理想
材料角度2：坚持原则不等于模式唯一
材料角度3：改革是制度自我完善而非否定根本制度','误区1：把“社会主义发展道路的多样性”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“基本原则与具体道路统一。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：不能照搬外国模式。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：实践探索允许曲折。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：评价道路要看是否解放生产力、改善人民生活并巩固制度”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“基本原则与具体道路统一。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：不能照搬外国模式。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：实践探索允许曲折。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：评价道路要看是否解放生产力、改善人民生活并巩固制度”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“社会主义发展道路的多样性”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “社会主义发展道路的多样性”解决的核心问题是什么？
2. 写出三个关键关系：基本原则与具体道路统一；不能照搬外国模式；实践探索允许曲折。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“社会主义发展道路的多样性”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“社会主义发展道路的多样性”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“社会主义发展道路的多样性”只写成口号而不说明成立条件','记忆主线：各国走向社会主义必须遵循科学社会主义基本原则，又要同本国历史文化、发展阶段和现实条件结合，因而道路具有多样性。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_c7f030fca3420d0c9e',NULL,'subject_politics','ch_pol_mao','新民主主义革命的性质与前途','【核心命题】
新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义封建主义和官僚资本主义的民主革命，前途是社会主义而非建立资本主义共和国。

【历史背景】
1. 社会性质和主要矛盾决定革命任务
2. 无产阶级领导决定新民主主义性质
3. 革命分两步走且相互衔接
4. 民主革命不能直接跳过必要阶段

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 旧民主主义与新民主主义的根本区别是领导权
- 民主革命前途不能由革命对象简单推出

【易错边界】
- 把“新民主主义革命的性质与前途”只写成口号而不说明成立条件
- 只背“社会性质和主要矛盾决定革命任务
- 无产阶级领导决定新民主主义性质
- 革命分两步走且相互衔接
- 民主革命不能直接跳过必要阶段”而不建立因果链
- 材料分析忽略“社会性质和主要矛盾决定革命任务
- 无产阶级领导决定新民主主义性质
- 革命分两步走且相互衔接
- 民主革命不能直接跳过必要阶段”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义封建主义和官僚资本主义的民主革命，前途是社会主义而非建立资本主义共和国。','high','high','2','["专项精讲", "考研政治", "history"]','curated-politics-english-v3','21','【核心命题】
新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义封建主义和官僚资本主义的民主革命，前途是社会主义而非建立资本主义共和国。

【历史背景】
1. 社会性质和主要矛盾决定革命任务
2. 无产阶级领导决定新民主主义性质
3. 革命分两步走且相互衔接
4. 民主革命不能直接跳过必要阶段

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 旧民主主义与新民主主义的根本区别是领导权
- 民主革命前途不能由革命对象简单推出

【易错边界】
- 把“新民主主义革命的性质与前途”只写成口号而不说明成立条件
- 只背“社会性质和主要矛盾决定革命任务
- 无产阶级领导决定新民主主义性质
- 革命分两步走且相互衔接
- 民主革命不能直接跳过必要阶段”而不建立因果链
- 材料分析忽略“社会性质和主要矛盾决定革命任务
- 无产阶级领导决定新民主主义性质
- 革命分两步走且相互衔接
- 民主革命不能直接跳过必要阶段”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 社会性质和主要矛盾决定革命任务
2. 无产阶级领导决定新民主主义性质
3. 革命分两步走且相互衔接
4. 民主革命不能直接跳过必要阶段','材料角度1：旧民主主义与新民主主义的根本区别是领导权
材料角度2：民主革命前途不能由革命对象简单推出','误区1：把“新民主主义革命的性质与前途”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“社会性质和主要矛盾决定革命任务。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：无产阶级领导决定新民主主义性质。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：革命分两步走且相互衔接。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：民主革命不能直接跳过必要阶段”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“社会性质和主要矛盾决定革命任务。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：无产阶级领导决定新民主主义性质。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：革命分两步走且相互衔接。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：民主革命不能直接跳过必要阶段”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“新民主主义革命的性质与前途”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “新民主主义革命的性质与前途”解决的核心问题是什么？
2. 写出三个关键关系：社会性质和主要矛盾决定革命任务；无产阶级领导决定新民主主义性质；革命分两步走且相互衔接。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“新民主主义革命的性质与前途”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“新民主主义革命的性质与前途”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“新民主主义革命的性质与前途”只写成口号而不说明成立条件','记忆主线：新民主主义革命是无产阶级领导的、人民大众的、反对帝国主义封建主义和官僚资本主义的民主革命，前途是社会主义而非建立资本主义共和国。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_3dbef909b3c6623d83',NULL,'subject_politics','ch_pol_mao','土地革命路线与群众路线','【核心命题】
土地革命依靠贫雇农、联合中农、限制富农、保护中小工商业者、消灭地主阶级，解决农民土地问题并建立工农联盟。

【历史背景】
1. 农民问题是中国革命基本问题
2. 土地政策随抗战等阶段调整
3. 群众路线要求一切为了群众一切依靠群众
4. 政策必须兼顾阶级力量和统一战线

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 把各时期土地政策混为一谈
- 只讲分田不讲政权和组织
- 忽略中农态度对联盟稳定的作用

【易错边界】
- 把“土地革命路线与群众路线”只写成口号而不说明成立条件
- 只背“农民问题是中国革命基本问题
- 土地政策随抗战等阶段调整
- 群众路线要求一切为了群众一切依靠群众
- 政策必须兼顾阶级力量和统一战线”而不建立因果链
- 材料分析忽略“农民问题是中国革命基本问题
- 土地政策随抗战等阶段调整
- 群众路线要求一切为了群众一切依靠群众
- 政策必须兼顾阶级力量和统一战线”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','土地革命依靠贫雇农、联合中农、限制富农、保护中小工商业者、消灭地主阶级，解决农民土地问题并建立工农联盟。','high','high','2','["专项精讲", "考研政治", "history"]','curated-politics-english-v3','22','【核心命题】
土地革命依靠贫雇农、联合中农、限制富农、保护中小工商业者、消灭地主阶级，解决农民土地问题并建立工农联盟。

【历史背景】
1. 农民问题是中国革命基本问题
2. 土地政策随抗战等阶段调整
3. 群众路线要求一切为了群众一切依靠群众
4. 政策必须兼顾阶级力量和统一战线

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 把各时期土地政策混为一谈
- 只讲分田不讲政权和组织
- 忽略中农态度对联盟稳定的作用

【易错边界】
- 把“土地革命路线与群众路线”只写成口号而不说明成立条件
- 只背“农民问题是中国革命基本问题
- 土地政策随抗战等阶段调整
- 群众路线要求一切为了群众一切依靠群众
- 政策必须兼顾阶级力量和统一战线”而不建立因果链
- 材料分析忽略“农民问题是中国革命基本问题
- 土地政策随抗战等阶段调整
- 群众路线要求一切为了群众一切依靠群众
- 政策必须兼顾阶级力量和统一战线”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 农民问题是中国革命基本问题
2. 土地政策随抗战等阶段调整
3. 群众路线要求一切为了群众一切依靠群众
4. 政策必须兼顾阶级力量和统一战线','材料角度1：把各时期土地政策混为一谈
材料角度2：只讲分田不讲政权和组织
材料角度3：忽略中农态度对联盟稳定的作用','误区1：把“土地革命路线与群众路线”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“农民问题是中国革命基本问题。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：土地政策随抗战等阶段调整。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：群众路线要求一切为了群众一切依靠群众。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：政策必须兼顾阶级力量和统一战线”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“农民问题是中国革命基本问题。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：土地政策随抗战等阶段调整。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：群众路线要求一切为了群众一切依靠群众。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：政策必须兼顾阶级力量和统一战线”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“土地革命路线与群众路线”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “土地革命路线与群众路线”解决的核心问题是什么？
2. 写出三个关键关系：农民问题是中国革命基本问题；土地政策随抗战等阶段调整；群众路线要求一切为了群众一切依靠群众。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“土地革命路线与群众路线”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“土地革命路线与群众路线”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“土地革命路线与群众路线”只写成口号而不说明成立条件','记忆主线：土地革命依靠贫雇农、联合中农、限制富农、保护中小工商业者、消灭地主阶级，解决农民土地问题并建立工农联盟。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_026eb8dfacbec8a31c',NULL,'subject_politics','ch_pol_mao','社会主义社会的基本矛盾与两类矛盾','【核心命题】
社会主义社会仍存在生产力与生产关系、经济基础与上层建筑矛盾，性质和解决方式不同于旧社会；政治生活中要区分敌我矛盾和人民内部矛盾。

【历史背景】
1. 基本矛盾可通过制度自身调节解决
2. 敌我矛盾用专政方法
3. 人民内部矛盾用民主方法
4. 正确处理人民内部矛盾是政治生活主题

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 把社会主义理解为没有矛盾
- 用同一种方式处理不同性质矛盾
- 忽视矛盾转化的条件

【易错边界】
- 把“社会主义社会的基本矛盾与两类矛盾”只写成口号而不说明成立条件
- 只背“基本矛盾可通过制度自身调节解决
- 敌我矛盾用专政方法
- 人民内部矛盾用民主方法
- 正确处理人民内部矛盾是政治生活主题”而不建立因果链
- 材料分析忽略“基本矛盾可通过制度自身调节解决
- 敌我矛盾用专政方法
- 人民内部矛盾用民主方法
- 正确处理人民内部矛盾是政治生活主题”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','社会主义社会仍存在生产力与生产关系、经济基础与上层建筑矛盾，性质和解决方式不同于旧社会；政治生活中要区分敌我矛盾和人民内部矛盾。','high','high','2','["专项精讲", "考研政治", "history"]','curated-politics-english-v3','23','【核心命题】
社会主义社会仍存在生产力与生产关系、经济基础与上层建筑矛盾，性质和解决方式不同于旧社会；政治生活中要区分敌我矛盾和人民内部矛盾。

【历史背景】
1. 基本矛盾可通过制度自身调节解决
2. 敌我矛盾用专政方法
3. 人民内部矛盾用民主方法
4. 正确处理人民内部矛盾是政治生活主题

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 把社会主义理解为没有矛盾
- 用同一种方式处理不同性质矛盾
- 忽视矛盾转化的条件

【易错边界】
- 把“社会主义社会的基本矛盾与两类矛盾”只写成口号而不说明成立条件
- 只背“基本矛盾可通过制度自身调节解决
- 敌我矛盾用专政方法
- 人民内部矛盾用民主方法
- 正确处理人民内部矛盾是政治生活主题”而不建立因果链
- 材料分析忽略“基本矛盾可通过制度自身调节解决
- 敌我矛盾用专政方法
- 人民内部矛盾用民主方法
- 正确处理人民内部矛盾是政治生活主题”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 基本矛盾可通过制度自身调节解决
2. 敌我矛盾用专政方法
3. 人民内部矛盾用民主方法
4. 正确处理人民内部矛盾是政治生活主题','材料角度1：把社会主义理解为没有矛盾
材料角度2：用同一种方式处理不同性质矛盾
材料角度3：忽视矛盾转化的条件','误区1：把“社会主义社会的基本矛盾与两类矛盾”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“基本矛盾可通过制度自身调节解决。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：敌我矛盾用专政方法。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：人民内部矛盾用民主方法。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：正确处理人民内部矛盾是政治生活主题”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“基本矛盾可通过制度自身调节解决。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：敌我矛盾用专政方法。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：人民内部矛盾用民主方法。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：正确处理人民内部矛盾是政治生活主题”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“社会主义社会的基本矛盾与两类矛盾”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “社会主义社会的基本矛盾与两类矛盾”解决的核心问题是什么？
2. 写出三个关键关系：基本矛盾可通过制度自身调节解决；敌我矛盾用专政方法；人民内部矛盾用民主方法。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“社会主义社会的基本矛盾与两类矛盾”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“社会主义社会的基本矛盾与两类矛盾”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“社会主义社会的基本矛盾与两类矛盾”只写成口号而不说明成立条件','记忆主线：社会主义社会仍存在生产力与生产关系、经济基础与上层建筑矛盾，性质和解决方式不同于旧社会；政治生活中要区分敌我矛盾和人民内部矛盾。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_84f8273506a7048e8c',NULL,'subject_politics','ch_pol_deng','发展才是硬道理与三个有利于','【核心命题】
发展是解决中国所有问题的关键；判断改革和工作成败主要看是否有利于发展社会主义社会生产力、增强社会主义国家综合国力、提高人民生活水平。

【战略定位】
1. 发展必须坚持社会主义方向
2. 三个有利于是实践标准而非单一经济指标
3. 改革发展稳定相统一
4. 发展成果要由人民共享

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 以发展为名忽视公平生态安全
- 把三个有利于简化为GDP
- 把坚持方向与拒绝改革混同

【易错边界】
- 把“发展才是硬道理与三个有利于”只写成口号而不说明成立条件
- 只背“发展必须坚持社会主义方向
- 三个有利于是实践标准而非单一经济指标
- 改革发展稳定相统一
- 发展成果要由人民共享”而不建立因果链
- 材料分析忽略“发展必须坚持社会主义方向
- 三个有利于是实践标准而非单一经济指标
- 改革发展稳定相统一
- 发展成果要由人民共享”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','发展是解决中国所有问题的关键；判断改革和工作成败主要看是否有利于发展社会主义社会生产力、增强社会主义国家综合国力、提高人民生活水平。','high','high','2','["专项精讲", "考研政治", "policy"]','curated-politics-english-v3','9','【核心命题】
发展是解决中国所有问题的关键；判断改革和工作成败主要看是否有利于发展社会主义社会生产力、增强社会主义国家综合国力、提高人民生活水平。

【战略定位】
1. 发展必须坚持社会主义方向
2. 三个有利于是实践标准而非单一经济指标
3. 改革发展稳定相统一
4. 发展成果要由人民共享

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 以发展为名忽视公平生态安全
- 把三个有利于简化为GDP
- 把坚持方向与拒绝改革混同

【易错边界】
- 把“发展才是硬道理与三个有利于”只写成口号而不说明成立条件
- 只背“发展必须坚持社会主义方向
- 三个有利于是实践标准而非单一经济指标
- 改革发展稳定相统一
- 发展成果要由人民共享”而不建立因果链
- 材料分析忽略“发展必须坚持社会主义方向
- 三个有利于是实践标准而非单一经济指标
- 改革发展稳定相统一
- 发展成果要由人民共享”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 发展必须坚持社会主义方向
2. 三个有利于是实践标准而非单一经济指标
3. 改革发展稳定相统一
4. 发展成果要由人民共享','材料角度1：以发展为名忽视公平生态安全
材料角度2：把三个有利于简化为GDP
材料角度3：把坚持方向与拒绝改革混同','误区1：把“发展才是硬道理与三个有利于”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“发展必须坚持社会主义方向。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：三个有利于是实践标准而非单一经济指标。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：改革发展稳定相统一。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：发展成果要由人民共享”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“发展必须坚持社会主义方向。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：三个有利于是实践标准而非单一经济指标。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：改革发展稳定相统一。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：发展成果要由人民共享”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“发展才是硬道理与三个有利于”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “发展才是硬道理与三个有利于”解决的核心问题是什么？
2. 写出三个关键关系：发展必须坚持社会主义方向；三个有利于是实践标准而非单一经济指标；改革发展稳定相统一。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“发展才是硬道理与三个有利于”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“发展才是硬道理与三个有利于”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“发展才是硬道理与三个有利于”只写成口号而不说明成立条件','记忆主线：发展是解决中国所有问题的关键；判断改革和工作成败主要看是否有利于发展社会主义社会生产力、增强社会主义国家综合国力、提高人民生活水平。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_a2efaa6a69af3c41fe',NULL,'subject_politics','ch_pol_deng','三步走发展战略','【核心命题】
现代化建设通过分阶段目标推进，从解决温饱、达到小康到基本实现现代化，体现从实际出发和长期战略安排。

【战略定位】
1. 目标分阶段
2. 数量指标与人民生活结合
3. 战略连续性与阶段调整统一
4. 后续全面小康和现代化安排在此基础上展开

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 不能把不同历史阶段目标混写
- 战略目标不是自然实现，需要改革开放和制度保障

【易错边界】
- 把“三步走发展战略”只写成口号而不说明成立条件
- 只背“目标分阶段
- 数量指标与人民生活结合
- 战略连续性与阶段调整统一
- 后续全面小康和现代化安排在此基础上展开”而不建立因果链
- 材料分析忽略“目标分阶段
- 数量指标与人民生活结合
- 战略连续性与阶段调整统一
- 后续全面小康和现代化安排在此基础上展开”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','现代化建设通过分阶段目标推进，从解决温饱、达到小康到基本实现现代化，体现从实际出发和长期战略安排。','high','high','2','["专项精讲", "考研政治", "policy"]','curated-politics-english-v3','10','【核心命题】
现代化建设通过分阶段目标推进，从解决温饱、达到小康到基本实现现代化，体现从实际出发和长期战略安排。

【战略定位】
1. 目标分阶段
2. 数量指标与人民生活结合
3. 战略连续性与阶段调整统一
4. 后续全面小康和现代化安排在此基础上展开

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 不能把不同历史阶段目标混写
- 战略目标不是自然实现，需要改革开放和制度保障

【易错边界】
- 把“三步走发展战略”只写成口号而不说明成立条件
- 只背“目标分阶段
- 数量指标与人民生活结合
- 战略连续性与阶段调整统一
- 后续全面小康和现代化安排在此基础上展开”而不建立因果链
- 材料分析忽略“目标分阶段
- 数量指标与人民生活结合
- 战略连续性与阶段调整统一
- 后续全面小康和现代化安排在此基础上展开”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 目标分阶段
2. 数量指标与人民生活结合
3. 战略连续性与阶段调整统一
4. 后续全面小康和现代化安排在此基础上展开','材料角度1：不能把不同历史阶段目标混写
材料角度2：战略目标不是自然实现，需要改革开放和制度保障','误区1：把“三步走发展战略”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“目标分阶段。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：数量指标与人民生活结合。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：战略连续性与阶段调整统一。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：后续全面小康和现代化安排在此基础上展开”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“目标分阶段。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：数量指标与人民生活结合。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：战略连续性与阶段调整统一。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：后续全面小康和现代化安排在此基础上展开”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“三步走发展战略”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “三步走发展战略”解决的核心问题是什么？
2. 写出三个关键关系：目标分阶段；数量指标与人民生活结合；战略连续性与阶段调整统一。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“三步走发展战略”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“三步走发展战略”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“三步走发展战略”只写成口号而不说明成立条件','记忆主线：现代化建设通过分阶段目标推进，从解决温饱、达到小康到基本实现现代化，体现从实际出发和长期战略安排。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_e53600e3c1e926809a',NULL,'subject_politics','ch_pol_deng','一国两制','【核心命题】
在一个中国前提下，国家主体坚持社会主义制度，香港澳门台湾保留原有资本主义制度和生活方式，服务国家统一与长期稳定。

【战略定位】
1. 一个中国是前提和基础
2. 两种制度从属并统一于一个国家
3. 高度自治不是完全自治
4. 中央全面管治权与特别行政区高度自治权统一

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 把两制置于一国之前
- 把高度自治解释为主权分割
- 忽略制度安排的历史条件

【易错边界】
- 把“一国两制”只写成口号而不说明成立条件
- 只背“一个中国是前提和基础
- 两种制度从属并统一于一个国家
- 高度自治不是完全自治
- 中央全面管治权与特别行政区高度自治权统一”而不建立因果链
- 材料分析忽略“一个中国是前提和基础
- 两种制度从属并统一于一个国家
- 高度自治不是完全自治
- 中央全面管治权与特别行政区高度自治权统一”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','在一个中国前提下，国家主体坚持社会主义制度，香港澳门台湾保留原有资本主义制度和生活方式，服务国家统一与长期稳定。','high','high','2','["专项精讲", "考研政治", "policy"]','curated-politics-english-v3','11','【核心命题】
在一个中国前提下，国家主体坚持社会主义制度，香港澳门台湾保留原有资本主义制度和生活方式，服务国家统一与长期稳定。

【战略定位】
1. 一个中国是前提和基础
2. 两种制度从属并统一于一个国家
3. 高度自治不是完全自治
4. 中央全面管治权与特别行政区高度自治权统一

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 把两制置于一国之前
- 把高度自治解释为主权分割
- 忽略制度安排的历史条件

【易错边界】
- 把“一国两制”只写成口号而不说明成立条件
- 只背“一个中国是前提和基础
- 两种制度从属并统一于一个国家
- 高度自治不是完全自治
- 中央全面管治权与特别行政区高度自治权统一”而不建立因果链
- 材料分析忽略“一个中国是前提和基础
- 两种制度从属并统一于一个国家
- 高度自治不是完全自治
- 中央全面管治权与特别行政区高度自治权统一”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 一个中国是前提和基础
2. 两种制度从属并统一于一个国家
3. 高度自治不是完全自治
4. 中央全面管治权与特别行政区高度自治权统一','材料角度1：把两制置于一国之前
材料角度2：把高度自治解释为主权分割
材料角度3：忽略制度安排的历史条件','误区1：把“一国两制”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“一个中国是前提和基础。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：两种制度从属并统一于一个国家。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：高度自治不是完全自治。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：中央全面管治权与特别行政区高度自治权统一”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“一个中国是前提和基础。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：两种制度从属并统一于一个国家。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：高度自治不是完全自治。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：中央全面管治权与特别行政区高度自治权统一”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“一国两制”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “一国两制”解决的核心问题是什么？
2. 写出三个关键关系：一个中国是前提和基础；两种制度从属并统一于一个国家；高度自治不是完全自治。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“一国两制”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“一国两制”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“一国两制”只写成口号而不说明成立条件','记忆主线：在一个中国前提下，国家主体坚持社会主义制度，香港澳门台湾保留原有资本主义制度和生活方式，服务国家统一与长期稳定。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_402cb80938396a11c4',NULL,'subject_politics','ch_pol_xi','坚持和加强党的全面领导','【核心命题】
中国共产党领导是中国特色社会主义最本质特征和中国特色社会主义制度最大优势，党的领导必须落实到改革发展稳定、内政外交国防、治党治国治军各领域。

【战略定位】
1. 维护党中央权威和集中统一领导
2. 完善党的领导制度体系
3. 提高科学民主依法执政水平
4. 全面从严治党保证领导能力

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 党的领导不是包办具体事务
- 集中统一与发挥各方面积极性相统一
- 政治领导思想领导组织领导不可割裂

【易错边界】
- 把“坚持和加强党的全面领导”只写成口号而不说明成立条件
- 只背“维护党中央权威和集中统一领导
- 完善党的领导制度体系
- 提高科学民主依法执政水平
- 全面从严治党保证领导能力”而不建立因果链
- 材料分析忽略“维护党中央权威和集中统一领导
- 完善党的领导制度体系
- 提高科学民主依法执政水平
- 全面从严治党保证领导能力”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','中国共产党领导是中国特色社会主义最本质特征和中国特色社会主义制度最大优势，党的领导必须落实到改革发展稳定、内政外交国防、治党治国治军各领域。','high','high','2','["专项精讲", "考研政治", "policy"]','curated-politics-english-v3','26','【核心命题】
中国共产党领导是中国特色社会主义最本质特征和中国特色社会主义制度最大优势，党的领导必须落实到改革发展稳定、内政外交国防、治党治国治军各领域。

【战略定位】
1. 维护党中央权威和集中统一领导
2. 完善党的领导制度体系
3. 提高科学民主依法执政水平
4. 全面从严治党保证领导能力

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 党的领导不是包办具体事务
- 集中统一与发挥各方面积极性相统一
- 政治领导思想领导组织领导不可割裂

【易错边界】
- 把“坚持和加强党的全面领导”只写成口号而不说明成立条件
- 只背“维护党中央权威和集中统一领导
- 完善党的领导制度体系
- 提高科学民主依法执政水平
- 全面从严治党保证领导能力”而不建立因果链
- 材料分析忽略“维护党中央权威和集中统一领导
- 完善党的领导制度体系
- 提高科学民主依法执政水平
- 全面从严治党保证领导能力”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 维护党中央权威和集中统一领导
2. 完善党的领导制度体系
3. 提高科学民主依法执政水平
4. 全面从严治党保证领导能力','材料角度1：党的领导不是包办具体事务
材料角度2：集中统一与发挥各方面积极性相统一
材料角度3：政治领导思想领导组织领导不可割裂','误区1：把“坚持和加强党的全面领导”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“维护党中央权威和集中统一领导。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：完善党的领导制度体系。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：提高科学民主依法执政水平。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：全面从严治党保证领导能力”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“维护党中央权威和集中统一领导。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：完善党的领导制度体系。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：提高科学民主依法执政水平。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：全面从严治党保证领导能力”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“坚持和加强党的全面领导”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “坚持和加强党的全面领导”解决的核心问题是什么？
2. 写出三个关键关系：维护党中央权威和集中统一领导；完善党的领导制度体系；提高科学民主依法执政水平。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“坚持和加强党的全面领导”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“坚持和加强党的全面领导”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“坚持和加强党的全面领导”只写成口号而不说明成立条件','记忆主线：中国共产党领导是中国特色社会主义最本质特征和中国特色社会主义制度最大优势，党的领导必须落实到改革发展稳定、内政外交国防、治党治国治军各领域。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_2b55335b46e26f072d',NULL,'subject_politics','ch_pol_xi','新发展理念','【核心命题】
创新、协调、绿色、开放、共享的新发展理念回答发展动力、不平衡、人与自然、内外联动和社会公平问题，是相互贯通的整体。

【战略定位】
1. 创新是第一动力
2. 协调是内生特点
3. 绿色是普遍形态
4. 开放是必由之路
5. 共享是根本目的
6. 完整准确全面贯彻

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 不能只选择有利部分贯彻
- 绿色与发展不是对立
- 共享不等于平均主义

【易错边界】
- 把“新发展理念”只写成口号而不说明成立条件
- 只背“创新是第一动力
- 协调是内生特点
- 绿色是普遍形态
- 开放是必由之路
- 共享是根本目的
- 完整准确全面贯彻”而不建立因果链
- 材料分析忽略“创新是第一动力
- 协调是内生特点
- 绿色是普遍形态
- 开放是必由之路
- 共享是根本目的
- 完整准确全面贯彻”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','创新、协调、绿色、开放、共享的新发展理念回答发展动力、不平衡、人与自然、内外联动和社会公平问题，是相互贯通的整体。','high','high','2','["专项精讲", "考研政治", "policy"]','curated-politics-english-v3','27','【核心命题】
创新、协调、绿色、开放、共享的新发展理念回答发展动力、不平衡、人与自然、内外联动和社会公平问题，是相互贯通的整体。

【战略定位】
1. 创新是第一动力
2. 协调是内生特点
3. 绿色是普遍形态
4. 开放是必由之路
5. 共享是根本目的
6. 完整准确全面贯彻

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 不能只选择有利部分贯彻
- 绿色与发展不是对立
- 共享不等于平均主义

【易错边界】
- 把“新发展理念”只写成口号而不说明成立条件
- 只背“创新是第一动力
- 协调是内生特点
- 绿色是普遍形态
- 开放是必由之路
- 共享是根本目的
- 完整准确全面贯彻”而不建立因果链
- 材料分析忽略“创新是第一动力
- 协调是内生特点
- 绿色是普遍形态
- 开放是必由之路
- 共享是根本目的
- 完整准确全面贯彻”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 创新是第一动力
2. 协调是内生特点
3. 绿色是普遍形态
4. 开放是必由之路
5. 共享是根本目的
6. 完整准确全面贯彻','材料角度1：不能只选择有利部分贯彻
材料角度2：绿色与发展不是对立
材料角度3：共享不等于平均主义','误区1：把“新发展理念”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“创新是第一动力。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：协调是内生特点。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：绿色是普遍形态。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：开放是必由之路。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：共享是根本目的。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：完整准确全面贯彻”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：材料分析忽略“创新是第一动力。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：协调是内生特点。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：绿色是普遍形态。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：开放是必由之路。纠正：回到概念层级、历史条件或因果方向重新作答。
误区12：共享是根本目的。纠正：回到概念层级、历史条件或因果方向重新作答。
误区13：完整准确全面贯彻”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“新发展理念”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “新发展理念”解决的核心问题是什么？
2. 写出三个关键关系：创新是第一动力；协调是内生特点；绿色是普遍形态。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“新发展理念”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“新发展理念”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“新发展理念”只写成口号而不说明成立条件','记忆主线：创新、协调、绿色、开放、共享的新发展理念回答发展动力、不平衡、人与自然、内外联动和社会公平问题，是相互贯通的整体。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_5d5a567b1b401204fa',NULL,'subject_politics','ch_pol_xi','教育科技人才一体推进','【核心命题】
教育、科技、人才是全面建设社会主义现代化国家的基础性战略性支撑，应统筹推进教育强国、科技强国和人才强国建设。

【战略定位】
1. 教育培养人才并支撑创新
2. 科技创新牵引产业升级
3. 人才是第一资源
4. 强化国家战略科技力量
5. 促进创新链产业链人才链融合

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 只重技术设备忽视基础研究和人才培养
- 把人才评价等同论文数量
- 创新不能脱离产业和社会需求

【易错边界】
- 把“教育科技人才一体推进”只写成口号而不说明成立条件
- 只背“教育培养人才并支撑创新
- 科技创新牵引产业升级
- 人才是第一资源
- 强化国家战略科技力量
- 促进创新链产业链人才链融合”而不建立因果链
- 材料分析忽略“教育培养人才并支撑创新
- 科技创新牵引产业升级
- 人才是第一资源
- 强化国家战略科技力量
- 促进创新链产业链人才链融合”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','教育、科技、人才是全面建设社会主义现代化国家的基础性战略性支撑，应统筹推进教育强国、科技强国和人才强国建设。','high','high','2','["专项精讲", "考研政治", "policy"]','curated-politics-english-v3','28','【核心命题】
教育、科技、人才是全面建设社会主义现代化国家的基础性战略性支撑，应统筹推进教育强国、科技强国和人才强国建设。

【战略定位】
1. 教育培养人才并支撑创新
2. 科技创新牵引产业升级
3. 人才是第一资源
4. 强化国家战略科技力量
5. 促进创新链产业链人才链融合

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 只重技术设备忽视基础研究和人才培养
- 把人才评价等同论文数量
- 创新不能脱离产业和社会需求

【易错边界】
- 把“教育科技人才一体推进”只写成口号而不说明成立条件
- 只背“教育培养人才并支撑创新
- 科技创新牵引产业升级
- 人才是第一资源
- 强化国家战略科技力量
- 促进创新链产业链人才链融合”而不建立因果链
- 材料分析忽略“教育培养人才并支撑创新
- 科技创新牵引产业升级
- 人才是第一资源
- 强化国家战略科技力量
- 促进创新链产业链人才链融合”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 教育培养人才并支撑创新
2. 科技创新牵引产业升级
3. 人才是第一资源
4. 强化国家战略科技力量
5. 促进创新链产业链人才链融合','材料角度1：只重技术设备忽视基础研究和人才培养
材料角度2：把人才评价等同论文数量
材料角度3：创新不能脱离产业和社会需求','误区1：把“教育科技人才一体推进”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“教育培养人才并支撑创新。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：科技创新牵引产业升级。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：人才是第一资源。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：强化国家战略科技力量。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：促进创新链产业链人才链融合”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：材料分析忽略“教育培养人才并支撑创新。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：科技创新牵引产业升级。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：人才是第一资源。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：强化国家战略科技力量。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：促进创新链产业链人才链融合”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“教育科技人才一体推进”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “教育科技人才一体推进”解决的核心问题是什么？
2. 写出三个关键关系：教育培养人才并支撑创新；科技创新牵引产业升级；人才是第一资源。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“教育科技人才一体推进”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“教育科技人才一体推进”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“教育科技人才一体推进”只写成口号而不说明成立条件','记忆主线：教育、科技、人才是全面建设社会主义现代化国家的基础性战略性支撑，应统筹推进教育强国、科技强国和人才强国建设。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_a24170769878565229',NULL,'subject_politics','ch_pol_xi','现代化经济体系与实体经济','【核心命题】
建设现代化经济体系必须把发展经济着力点放在实体经济上，推动产业体系高级化、智能化、绿色化并提高产业链供应链韧性。

【战略定位】
1. 实体经济是财富创造根基
2. 数字经济与实体经济深度融合
3. 制造业高质量发展
4. 防止经济脱实向虚
5. 统筹效率和安全

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 发展金融不能偏离服务实体
- 数字化不等于简单上设备
- 产业升级要兼顾就业和区域协调

【易错边界】
- 把“现代化经济体系与实体经济”只写成口号而不说明成立条件
- 只背“实体经济是财富创造根基
- 数字经济与实体经济深度融合
- 制造业高质量发展
- 防止经济脱实向虚
- 统筹效率和安全”而不建立因果链
- 材料分析忽略“实体经济是财富创造根基
- 数字经济与实体经济深度融合
- 制造业高质量发展
- 防止经济脱实向虚
- 统筹效率和安全”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','建设现代化经济体系必须把发展经济着力点放在实体经济上，推动产业体系高级化、智能化、绿色化并提高产业链供应链韧性。','high','high','2','["专项精讲", "考研政治", "policy"]','curated-politics-english-v3','29','【核心命题】
建设现代化经济体系必须把发展经济着力点放在实体经济上，推动产业体系高级化、智能化、绿色化并提高产业链供应链韧性。

【战略定位】
1. 实体经济是财富创造根基
2. 数字经济与实体经济深度融合
3. 制造业高质量发展
4. 防止经济脱实向虚
5. 统筹效率和安全

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 发展金融不能偏离服务实体
- 数字化不等于简单上设备
- 产业升级要兼顾就业和区域协调

【易错边界】
- 把“现代化经济体系与实体经济”只写成口号而不说明成立条件
- 只背“实体经济是财富创造根基
- 数字经济与实体经济深度融合
- 制造业高质量发展
- 防止经济脱实向虚
- 统筹效率和安全”而不建立因果链
- 材料分析忽略“实体经济是财富创造根基
- 数字经济与实体经济深度融合
- 制造业高质量发展
- 防止经济脱实向虚
- 统筹效率和安全”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 实体经济是财富创造根基
2. 数字经济与实体经济深度融合
3. 制造业高质量发展
4. 防止经济脱实向虚
5. 统筹效率和安全','材料角度1：发展金融不能偏离服务实体
材料角度2：数字化不等于简单上设备
材料角度3：产业升级要兼顾就业和区域协调','误区1：把“现代化经济体系与实体经济”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“实体经济是财富创造根基。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：数字经济与实体经济深度融合。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：制造业高质量发展。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：防止经济脱实向虚。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：统筹效率和安全”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：材料分析忽略“实体经济是财富创造根基。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：数字经济与实体经济深度融合。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：制造业高质量发展。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：防止经济脱实向虚。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：统筹效率和安全”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“现代化经济体系与实体经济”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “现代化经济体系与实体经济”解决的核心问题是什么？
2. 写出三个关键关系：实体经济是财富创造根基；数字经济与实体经济深度融合；制造业高质量发展。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“现代化经济体系与实体经济”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“现代化经济体系与实体经济”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“现代化经济体系与实体经济”只写成口号而不说明成立条件','记忆主线：建设现代化经济体系必须把发展经济着力点放在实体经济上，推动产业体系高级化、智能化、绿色化并提高产业链供应链韧性。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_11d01121974499f002',NULL,'subject_politics','ch_pol_xi','生态文明与美丽中国','【核心命题】
生态文明建设坚持人与自然和谐共生，贯彻绿水青山就是金山银山理念，推进降碳减污扩绿增长协同。

【战略定位】
1. 生态优先绿色发展
2. 山水林田湖草沙一体化保护
3. 资源节约集约利用
4. 环境治理体系
5. 积极稳妥推进碳达峰碳中和

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 先污染后治理不可取
- 生态保护与经济发展可通过转型统一
- 碳目标不能脱离能源和产业实际

【易错边界】
- 把“生态文明与美丽中国”只写成口号而不说明成立条件
- 只背“生态优先绿色发展
- 山水林田湖草沙一体化保护
- 资源节约集约利用
- 环境治理体系
- 积极稳妥推进碳达峰碳中和”而不建立因果链
- 材料分析忽略“生态优先绿色发展
- 山水林田湖草沙一体化保护
- 资源节约集约利用
- 环境治理体系
- 积极稳妥推进碳达峰碳中和”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','生态文明建设坚持人与自然和谐共生，贯彻绿水青山就是金山银山理念，推进降碳减污扩绿增长协同。','high','high','2','["专项精讲", "考研政治", "policy"]','curated-politics-english-v3','30','【核心命题】
生态文明建设坚持人与自然和谐共生，贯彻绿水青山就是金山银山理念，推进降碳减污扩绿增长协同。

【战略定位】
1. 生态优先绿色发展
2. 山水林田湖草沙一体化保护
3. 资源节约集约利用
4. 环境治理体系
5. 积极稳妥推进碳达峰碳中和

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 先污染后治理不可取
- 生态保护与经济发展可通过转型统一
- 碳目标不能脱离能源和产业实际

【易错边界】
- 把“生态文明与美丽中国”只写成口号而不说明成立条件
- 只背“生态优先绿色发展
- 山水林田湖草沙一体化保护
- 资源节约集约利用
- 环境治理体系
- 积极稳妥推进碳达峰碳中和”而不建立因果链
- 材料分析忽略“生态优先绿色发展
- 山水林田湖草沙一体化保护
- 资源节约集约利用
- 环境治理体系
- 积极稳妥推进碳达峰碳中和”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 生态优先绿色发展
2. 山水林田湖草沙一体化保护
3. 资源节约集约利用
4. 环境治理体系
5. 积极稳妥推进碳达峰碳中和','材料角度1：先污染后治理不可取
材料角度2：生态保护与经济发展可通过转型统一
材料角度3：碳目标不能脱离能源和产业实际','误区1：把“生态文明与美丽中国”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“生态优先绿色发展。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：山水林田湖草沙一体化保护。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：资源节约集约利用。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：环境治理体系。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：积极稳妥推进碳达峰碳中和”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：材料分析忽略“生态优先绿色发展。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：山水林田湖草沙一体化保护。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：资源节约集约利用。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：环境治理体系。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：积极稳妥推进碳达峰碳中和”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“生态文明与美丽中国”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “生态文明与美丽中国”解决的核心问题是什么？
2. 写出三个关键关系：生态优先绿色发展；山水林田湖草沙一体化保护；资源节约集约利用。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“生态文明与美丽中国”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“生态文明与美丽中国”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“生态文明与美丽中国”只写成口号而不说明成立条件','记忆主线：生态文明建设坚持人与自然和谐共生，贯彻绿水青山就是金山银山理念，推进降碳减污扩绿增长协同。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_f4574b1ff7530e65a4',NULL,'subject_politics','ch_pol_xi','保障和改善民生','【核心命题】
增进民生福祉是发展的根本目的，应尽力而为量力而行，健全基本公共服务体系，解决就业教育医疗社保住房养老等问题。

【战略定位】
1. 就业是最基本民生
2. 收入分配制度
3. 社会保障安全网
4. 公共服务均等化
5. 共同富裕是长期过程

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 福利承诺不能脱离发展水平
- 共同富裕不等于同时同步同等富裕
- 民生建设既补短板也建机制

【易错边界】
- 把“保障和改善民生”只写成口号而不说明成立条件
- 只背“就业是最基本民生
- 收入分配制度
- 社会保障安全网
- 公共服务均等化
- 共同富裕是长期过程”而不建立因果链
- 材料分析忽略“就业是最基本民生
- 收入分配制度
- 社会保障安全网
- 公共服务均等化
- 共同富裕是长期过程”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','增进民生福祉是发展的根本目的，应尽力而为量力而行，健全基本公共服务体系，解决就业教育医疗社保住房养老等问题。','high','high','2','["专项精讲", "考研政治", "policy"]','curated-politics-english-v3','31','【核心命题】
增进民生福祉是发展的根本目的，应尽力而为量力而行，健全基本公共服务体系，解决就业教育医疗社保住房养老等问题。

【战略定位】
1. 就业是最基本民生
2. 收入分配制度
3. 社会保障安全网
4. 公共服务均等化
5. 共同富裕是长期过程

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 福利承诺不能脱离发展水平
- 共同富裕不等于同时同步同等富裕
- 民生建设既补短板也建机制

【易错边界】
- 把“保障和改善民生”只写成口号而不说明成立条件
- 只背“就业是最基本民生
- 收入分配制度
- 社会保障安全网
- 公共服务均等化
- 共同富裕是长期过程”而不建立因果链
- 材料分析忽略“就业是最基本民生
- 收入分配制度
- 社会保障安全网
- 公共服务均等化
- 共同富裕是长期过程”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 就业是最基本民生
2. 收入分配制度
3. 社会保障安全网
4. 公共服务均等化
5. 共同富裕是长期过程','材料角度1：福利承诺不能脱离发展水平
材料角度2：共同富裕不等于同时同步同等富裕
材料角度3：民生建设既补短板也建机制','误区1：把“保障和改善民生”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“就业是最基本民生。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：收入分配制度。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：社会保障安全网。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：公共服务均等化。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：共同富裕是长期过程”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：材料分析忽略“就业是最基本民生。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：收入分配制度。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：社会保障安全网。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：公共服务均等化。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：共同富裕是长期过程”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“保障和改善民生”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “保障和改善民生”解决的核心问题是什么？
2. 写出三个关键关系：就业是最基本民生；收入分配制度；社会保障安全网。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“保障和改善民生”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“保障和改善民生”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“保障和改善民生”只写成口号而不说明成立条件','记忆主线：增进民生福祉是发展的根本目的，应尽力而为量力而行，健全基本公共服务体系，解决就业教育医疗社保住房养老等问题。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_20ba847d267f3a8c59',NULL,'subject_politics','ch_pol_xi','全面从严治党与自我革命','【核心命题】
全面从严治党是新时代党的建设鲜明主题，自我革命是党跳出治乱兴衰历史周期率的重要答案。

【战略定位】
1. 政治建设统领
2. 思想建设基础
3. 组织体系严密
4. 作风纪律建设
5. 反腐败斗争
6. 制度治党依规治党

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 反腐败不是阶段性任务
- 严管与激励担当统一
- 党的自我监督与人民监督结合

【易错边界】
- 把“全面从严治党与自我革命”只写成口号而不说明成立条件
- 只背“政治建设统领
- 思想建设基础
- 组织体系严密
- 作风纪律建设
- 反腐败斗争
- 制度治党依规治党”而不建立因果链
- 材料分析忽略“政治建设统领
- 思想建设基础
- 组织体系严密
- 作风纪律建设
- 反腐败斗争
- 制度治党依规治党”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','全面从严治党是新时代党的建设鲜明主题，自我革命是党跳出治乱兴衰历史周期率的重要答案。','high','high','2','["专项精讲", "考研政治", "policy"]','curated-politics-english-v3','32','【核心命题】
全面从严治党是新时代党的建设鲜明主题，自我革命是党跳出治乱兴衰历史周期率的重要答案。

【战略定位】
1. 政治建设统领
2. 思想建设基础
3. 组织体系严密
4. 作风纪律建设
5. 反腐败斗争
6. 制度治党依规治党

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 反腐败不是阶段性任务
- 严管与激励担当统一
- 党的自我监督与人民监督结合

【易错边界】
- 把“全面从严治党与自我革命”只写成口号而不说明成立条件
- 只背“政治建设统领
- 思想建设基础
- 组织体系严密
- 作风纪律建设
- 反腐败斗争
- 制度治党依规治党”而不建立因果链
- 材料分析忽略“政治建设统领
- 思想建设基础
- 组织体系严密
- 作风纪律建设
- 反腐败斗争
- 制度治党依规治党”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 政治建设统领
2. 思想建设基础
3. 组织体系严密
4. 作风纪律建设
5. 反腐败斗争
6. 制度治党依规治党','材料角度1：反腐败不是阶段性任务
材料角度2：严管与激励担当统一
材料角度3：党的自我监督与人民监督结合','误区1：把“全面从严治党与自我革命”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“政治建设统领。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：思想建设基础。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：组织体系严密。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：作风纪律建设。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：反腐败斗争。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：制度治党依规治党”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：材料分析忽略“政治建设统领。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：思想建设基础。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：组织体系严密。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：作风纪律建设。纠正：回到概念层级、历史条件或因果方向重新作答。
误区12：反腐败斗争。纠正：回到概念层级、历史条件或因果方向重新作答。
误区13：制度治党依规治党”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“全面从严治党与自我革命”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “全面从严治党与自我革命”解决的核心问题是什么？
2. 写出三个关键关系：政治建设统领；思想建设基础；组织体系严密。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“全面从严治党与自我革命”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“全面从严治党与自我革命”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“全面从严治党与自我革命”只写成口号而不说明成立条件','记忆主线：全面从严治党是新时代党的建设鲜明主题，自我革命是党跳出治乱兴衰历史周期率的重要答案。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_c5a416fcc4d2c175fa',NULL,'subject_politics','ch_pol_xi','国防和军队现代化','【核心命题】
建设巩固国防和强大人民军队是现代化建设战略任务，坚持党对人民军队绝对领导，推进政治建军、改革强军、科技强军、人才强军、依法治军。

【战略定位】
1. 党指挥枪是根本原则
2. 战斗力是唯一根本标准
3. 机械化信息化智能化融合
4. 军民融合发展
5. 国防建设与经济建设协调

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 现代化不能只理解为武器更新
- 改革、科技、人才和制度共同决定战斗力

【易错边界】
- 把“国防和军队现代化”只写成口号而不说明成立条件
- 只背“党指挥枪是根本原则
- 战斗力是唯一根本标准
- 机械化信息化智能化融合
- 军民融合发展
- 国防建设与经济建设协调”而不建立因果链
- 材料分析忽略“党指挥枪是根本原则
- 战斗力是唯一根本标准
- 机械化信息化智能化融合
- 军民融合发展
- 国防建设与经济建设协调”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','建设巩固国防和强大人民军队是现代化建设战略任务，坚持党对人民军队绝对领导，推进政治建军、改革强军、科技强军、人才强军、依法治军。','high','high','2','["专项精讲", "考研政治", "policy"]','curated-politics-english-v3','33','【核心命题】
建设巩固国防和强大人民军队是现代化建设战略任务，坚持党对人民军队绝对领导，推进政治建军、改革强军、科技强军、人才强军、依法治军。

【战略定位】
1. 党指挥枪是根本原则
2. 战斗力是唯一根本标准
3. 机械化信息化智能化融合
4. 军民融合发展
5. 国防建设与经济建设协调

【主要任务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【关系处理】
- 现代化不能只理解为武器更新
- 改革、科技、人才和制度共同决定战斗力

【易错边界】
- 把“国防和军队现代化”只写成口号而不说明成立条件
- 只背“党指挥枪是根本原则
- 战斗力是唯一根本标准
- 机械化信息化智能化融合
- 军民融合发展
- 国防建设与经济建设协调”而不建立因果链
- 材料分析忽略“党指挥枪是根本原则
- 战斗力是唯一根本标准
- 机械化信息化智能化融合
- 军民融合发展
- 国防建设与经济建设协调”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 党指挥枪是根本原则
2. 战斗力是唯一根本标准
3. 机械化信息化智能化融合
4. 军民融合发展
5. 国防建设与经济建设协调','材料角度1：现代化不能只理解为武器更新
材料角度2：改革、科技、人才和制度共同决定战斗力','误区1：把“国防和军队现代化”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“党指挥枪是根本原则。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：战斗力是唯一根本标准。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：机械化信息化智能化融合。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：军民融合发展。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：国防建设与经济建设协调”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：材料分析忽略“党指挥枪是根本原则。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：战斗力是唯一根本标准。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：机械化信息化智能化融合。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：军民融合发展。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：国防建设与经济建设协调”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“国防和军队现代化”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “国防和军队现代化”解决的核心问题是什么？
2. 写出三个关键关系：党指挥枪是根本原则；战斗力是唯一根本标准；机械化信息化智能化融合。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“国防和军队现代化”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“国防和军队现代化”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“国防和军队现代化”只写成口号而不说明成立条件','记忆主线：建设巩固国防和强大人民军队是现代化建设战略任务，坚持党对人民军队绝对领导，推进政治建军、改革强军、科技强军、人才强军、依法治军。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_f69ae54826e5ba7b1e',NULL,'subject_politics','ch_pol_hist_old','近代中国反侵略斗争失败原因','【核心命题】
近代反侵略斗争失败根本原因是社会制度腐败，重要原因是经济技术落后；落后要挨打，但制度腐败使落后状态难以改变并削弱动员能力。

【历史背景】
1. 统治集团妥协退让
2. 国家组织能力不足
3. 经济技术基础薄弱
4. 人民斗争显示民族意识觉醒
5. 失败教训推动寻找新道路

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 不能把失败只归因武器落后
- 人民反抗与政府妥协要区分
- 反侵略斗争具有历史正义性

【易错边界】
- 把“近代中国反侵略斗争失败原因”只写成口号而不说明成立条件
- 只背“统治集团妥协退让
- 国家组织能力不足
- 经济技术基础薄弱
- 人民斗争显示民族意识觉醒
- 失败教训推动寻找新道路”而不建立因果链
- 材料分析忽略“统治集团妥协退让
- 国家组织能力不足
- 经济技术基础薄弱
- 人民斗争显示民族意识觉醒
- 失败教训推动寻找新道路”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','近代反侵略斗争失败根本原因是社会制度腐败，重要原因是经济技术落后；落后要挨打，但制度腐败使落后状态难以改变并削弱动员能力。','high','high','2','["专项精讲", "考研政治", "history"]','curated-politics-english-v3','9','【核心命题】
近代反侵略斗争失败根本原因是社会制度腐败，重要原因是经济技术落后；落后要挨打，但制度腐败使落后状态难以改变并削弱动员能力。

【历史背景】
1. 统治集团妥协退让
2. 国家组织能力不足
3. 经济技术基础薄弱
4. 人民斗争显示民族意识觉醒
5. 失败教训推动寻找新道路

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 不能把失败只归因武器落后
- 人民反抗与政府妥协要区分
- 反侵略斗争具有历史正义性

【易错边界】
- 把“近代中国反侵略斗争失败原因”只写成口号而不说明成立条件
- 只背“统治集团妥协退让
- 国家组织能力不足
- 经济技术基础薄弱
- 人民斗争显示民族意识觉醒
- 失败教训推动寻找新道路”而不建立因果链
- 材料分析忽略“统治集团妥协退让
- 国家组织能力不足
- 经济技术基础薄弱
- 人民斗争显示民族意识觉醒
- 失败教训推动寻找新道路”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 统治集团妥协退让
2. 国家组织能力不足
3. 经济技术基础薄弱
4. 人民斗争显示民族意识觉醒
5. 失败教训推动寻找新道路','材料角度1：不能把失败只归因武器落后
材料角度2：人民反抗与政府妥协要区分
材料角度3：反侵略斗争具有历史正义性','误区1：把“近代中国反侵略斗争失败原因”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“统治集团妥协退让。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：国家组织能力不足。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：经济技术基础薄弱。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：人民斗争显示民族意识觉醒。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：失败教训推动寻找新道路”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：材料分析忽略“统治集团妥协退让。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：国家组织能力不足。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：经济技术基础薄弱。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：人民斗争显示民族意识觉醒。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：失败教训推动寻找新道路”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“近代中国反侵略斗争失败原因”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “近代中国反侵略斗争失败原因”解决的核心问题是什么？
2. 写出三个关键关系：统治集团妥协退让；国家组织能力不足；经济技术基础薄弱。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“近代中国反侵略斗争失败原因”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“近代中国反侵略斗争失败原因”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“近代中国反侵略斗争失败原因”只写成口号而不说明成立条件','记忆主线：近代反侵略斗争失败根本原因是社会制度腐败，重要原因是经济技术落后；落后要挨打，但制度腐败使落后状态难以改变并削弱动员能力。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_6f1bb4f133af47610d',NULL,'subject_politics','ch_pol_hist_new','马克思主义在中国的传播与早期组织','【核心命题】
十月革命和五四运动推动马克思主义广泛传播，先进知识分子在同各种思潮论战和工人运动结合中建立共产党早期组织。

【历史背景】
1. 李大钊等传播马克思主义
2. 问题与主义论战
3. 马克思主义与工人运动结合
4. 早期组织为建党准备思想干部和组织条件

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 传播不是简单译介而是实践结合
- 五四前后思想转变有过程
- 建党条件包含阶级思想组织多方面

【易错边界】
- 把“马克思主义在中国的传播与早期组织”只写成口号而不说明成立条件
- 只背“李大钊等传播马克思主义
- 问题与主义论战
- 马克思主义与工人运动结合
- 早期组织为建党准备思想干部和组织条件”而不建立因果链
- 材料分析忽略“李大钊等传播马克思主义
- 问题与主义论战
- 马克思主义与工人运动结合
- 早期组织为建党准备思想干部和组织条件”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','十月革命和五四运动推动马克思主义广泛传播，先进知识分子在同各种思潮论战和工人运动结合中建立共产党早期组织。','high','high','2','["专项精讲", "考研政治", "history"]','curated-politics-english-v3','25','【核心命题】
十月革命和五四运动推动马克思主义广泛传播，先进知识分子在同各种思潮论战和工人运动结合中建立共产党早期组织。

【历史背景】
1. 李大钊等传播马克思主义
2. 问题与主义论战
3. 马克思主义与工人运动结合
4. 早期组织为建党准备思想干部和组织条件

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 传播不是简单译介而是实践结合
- 五四前后思想转变有过程
- 建党条件包含阶级思想组织多方面

【易错边界】
- 把“马克思主义在中国的传播与早期组织”只写成口号而不说明成立条件
- 只背“李大钊等传播马克思主义
- 问题与主义论战
- 马克思主义与工人运动结合
- 早期组织为建党准备思想干部和组织条件”而不建立因果链
- 材料分析忽略“李大钊等传播马克思主义
- 问题与主义论战
- 马克思主义与工人运动结合
- 早期组织为建党准备思想干部和组织条件”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 李大钊等传播马克思主义
2. 问题与主义论战
3. 马克思主义与工人运动结合
4. 早期组织为建党准备思想干部和组织条件','材料角度1：传播不是简单译介而是实践结合
材料角度2：五四前后思想转变有过程
材料角度3：建党条件包含阶级思想组织多方面','误区1：把“马克思主义在中国的传播与早期组织”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“李大钊等传播马克思主义。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：问题与主义论战。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：马克思主义与工人运动结合。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：早期组织为建党准备思想干部和组织条件”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“李大钊等传播马克思主义。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：问题与主义论战。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：马克思主义与工人运动结合。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：早期组织为建党准备思想干部和组织条件”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“马克思主义在中国的传播与早期组织”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “马克思主义在中国的传播与早期组织”解决的核心问题是什么？
2. 写出三个关键关系：李大钊等传播马克思主义；问题与主义论战；马克思主义与工人运动结合。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“马克思主义在中国的传播与早期组织”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“马克思主义在中国的传播与早期组织”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“马克思主义在中国的传播与早期组织”只写成口号而不说明成立条件','记忆主线：十月革命和五四运动推动马克思主义广泛传播，先进知识分子在同各种思潮论战和工人运动结合中建立共产党早期组织。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_be75460c310809e582',NULL,'subject_politics','ch_pol_hist_new','大革命失败与土地革命兴起','【核心命题】
国民革命在反帝反封建方面取得进展，但因大资产阶级叛变、党内右倾错误和缺乏独立武装领导权而失败，革命转入土地革命战争。

【历史背景】
1. 统一战线中必须坚持独立自主
2. 掌握革命武装
3. 八七会议确定土地革命和武装反抗
4. 农村根据地道路逐步开辟

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 不能否定第一次国共合作历史作用
- 失败原因要区分客观与主观
- 南昌起义秋收起义井冈山相互衔接

【易错边界】
- 把“大革命失败与土地革命兴起”只写成口号而不说明成立条件
- 只背“统一战线中必须坚持独立自主
- 掌握革命武装
- 八七会议确定土地革命和武装反抗
- 农村根据地道路逐步开辟”而不建立因果链
- 材料分析忽略“统一战线中必须坚持独立自主
- 掌握革命武装
- 八七会议确定土地革命和武装反抗
- 农村根据地道路逐步开辟”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','国民革命在反帝反封建方面取得进展，但因大资产阶级叛变、党内右倾错误和缺乏独立武装领导权而失败，革命转入土地革命战争。','high','high','2','["专项精讲", "考研政治", "history"]','curated-politics-english-v3','26','【核心命题】
国民革命在反帝反封建方面取得进展，但因大资产阶级叛变、党内右倾错误和缺乏独立武装领导权而失败，革命转入土地革命战争。

【历史背景】
1. 统一战线中必须坚持独立自主
2. 掌握革命武装
3. 八七会议确定土地革命和武装反抗
4. 农村根据地道路逐步开辟

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 不能否定第一次国共合作历史作用
- 失败原因要区分客观与主观
- 南昌起义秋收起义井冈山相互衔接

【易错边界】
- 把“大革命失败与土地革命兴起”只写成口号而不说明成立条件
- 只背“统一战线中必须坚持独立自主
- 掌握革命武装
- 八七会议确定土地革命和武装反抗
- 农村根据地道路逐步开辟”而不建立因果链
- 材料分析忽略“统一战线中必须坚持独立自主
- 掌握革命武装
- 八七会议确定土地革命和武装反抗
- 农村根据地道路逐步开辟”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 统一战线中必须坚持独立自主
2. 掌握革命武装
3. 八七会议确定土地革命和武装反抗
4. 农村根据地道路逐步开辟','材料角度1：不能否定第一次国共合作历史作用
材料角度2：失败原因要区分客观与主观
材料角度3：南昌起义秋收起义井冈山相互衔接','误区1：把“大革命失败与土地革命兴起”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“统一战线中必须坚持独立自主。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：掌握革命武装。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：八七会议确定土地革命和武装反抗。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：农村根据地道路逐步开辟”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“统一战线中必须坚持独立自主。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：掌握革命武装。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：八七会议确定土地革命和武装反抗。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：农村根据地道路逐步开辟”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“大革命失败与土地革命兴起”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “大革命失败与土地革命兴起”解决的核心问题是什么？
2. 写出三个关键关系：统一战线中必须坚持独立自主；掌握革命武装；八七会议确定土地革命和武装反抗。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“大革命失败与土地革命兴起”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“大革命失败与土地革命兴起”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“大革命失败与土地革命兴起”只写成口号而不说明成立条件','记忆主线：国民革命在反帝反封建方面取得进展，但因大资产阶级叛变、党内右倾错误和缺乏独立武装领导权而失败，革命转入土地革命战争。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_774bbf4f92756d5103',NULL,'subject_politics','ch_pol_hist_new','长征、遵义会议与革命转折','【核心命题】
长征保存并锻炼革命力量，遵义会议集中解决当时最紧迫的军事和组织问题，事实上确立毛泽东在党中央和红军领导地位。

【历史背景】
1. 第五次反围剿失败背景
2. 遵义会议独立自主解决中国革命问题
3. 长征实现战略转移
4. 长征精神体现理想信念和群众基础

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 遵义会议没有系统解决所有政治路线问题
- 长征不是被动逃跑而是战略转移
- 时间节点和意义要准确

【易错边界】
- 把“长征、遵义会议与革命转折”只写成口号而不说明成立条件
- 只背“第五次反围剿失败背景
- 遵义会议独立自主解决中国革命问题
- 长征实现战略转移
- 长征精神体现理想信念和群众基础”而不建立因果链
- 材料分析忽略“第五次反围剿失败背景
- 遵义会议独立自主解决中国革命问题
- 长征实现战略转移
- 长征精神体现理想信念和群众基础”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','长征保存并锻炼革命力量，遵义会议集中解决当时最紧迫的军事和组织问题，事实上确立毛泽东在党中央和红军领导地位。','high','high','2','["专项精讲", "考研政治", "history"]','curated-politics-english-v3','27','【核心命题】
长征保存并锻炼革命力量，遵义会议集中解决当时最紧迫的军事和组织问题，事实上确立毛泽东在党中央和红军领导地位。

【历史背景】
1. 第五次反围剿失败背景
2. 遵义会议独立自主解决中国革命问题
3. 长征实现战略转移
4. 长征精神体现理想信念和群众基础

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 遵义会议没有系统解决所有政治路线问题
- 长征不是被动逃跑而是战略转移
- 时间节点和意义要准确

【易错边界】
- 把“长征、遵义会议与革命转折”只写成口号而不说明成立条件
- 只背“第五次反围剿失败背景
- 遵义会议独立自主解决中国革命问题
- 长征实现战略转移
- 长征精神体现理想信念和群众基础”而不建立因果链
- 材料分析忽略“第五次反围剿失败背景
- 遵义会议独立自主解决中国革命问题
- 长征实现战略转移
- 长征精神体现理想信念和群众基础”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 第五次反围剿失败背景
2. 遵义会议独立自主解决中国革命问题
3. 长征实现战略转移
4. 长征精神体现理想信念和群众基础','材料角度1：遵义会议没有系统解决所有政治路线问题
材料角度2：长征不是被动逃跑而是战略转移
材料角度3：时间节点和意义要准确','误区1：把“长征、遵义会议与革命转折”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“第五次反围剿失败背景。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：遵义会议独立自主解决中国革命问题。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：长征实现战略转移。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：长征精神体现理想信念和群众基础”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“第五次反围剿失败背景。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：遵义会议独立自主解决中国革命问题。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：长征实现战略转移。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：长征精神体现理想信念和群众基础”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“长征、遵义会议与革命转折”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “长征、遵义会议与革命转折”解决的核心问题是什么？
2. 写出三个关键关系：第五次反围剿失败背景；遵义会议独立自主解决中国革命问题；长征实现战略转移。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“长征、遵义会议与革命转折”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“长征、遵义会议与革命转折”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“长征、遵义会议与革命转折”只写成口号而不说明成立条件','记忆主线：长征保存并锻炼革命力量，遵义会议集中解决当时最紧迫的军事和组织问题，事实上确立毛泽东在党中央和红军领导地位。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_0fc2a62985ba0de854',NULL,'subject_politics','ch_pol_hist_new','西安事变与抗日民族统一战线','【核心命题】
西安事变和平解决成为时局转换枢纽，推动停止内战一致抗日；抗日民族统一战线坚持国共合作又坚持独立自主。

【历史背景】
1. 民族矛盾上升
2. 和平解决符合全民族利益
3. 统一战线具有广泛性和复杂性
4. 抗战中坚持全面抗战路线

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 和平解决不等于国共矛盾消失
- 统一战线不等于放弃领导权
- 正面战场与敌后战场都作出贡献

【易错边界】
- 把“西安事变与抗日民族统一战线”只写成口号而不说明成立条件
- 只背“民族矛盾上升
- 和平解决符合全民族利益
- 统一战线具有广泛性和复杂性
- 抗战中坚持全面抗战路线”而不建立因果链
- 材料分析忽略“民族矛盾上升
- 和平解决符合全民族利益
- 统一战线具有广泛性和复杂性
- 抗战中坚持全面抗战路线”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','西安事变和平解决成为时局转换枢纽，推动停止内战一致抗日；抗日民族统一战线坚持国共合作又坚持独立自主。','high','high','2','["专项精讲", "考研政治", "history"]','curated-politics-english-v3','28','【核心命题】
西安事变和平解决成为时局转换枢纽，推动停止内战一致抗日；抗日民族统一战线坚持国共合作又坚持独立自主。

【历史背景】
1. 民族矛盾上升
2. 和平解决符合全民族利益
3. 统一战线具有广泛性和复杂性
4. 抗战中坚持全面抗战路线

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 和平解决不等于国共矛盾消失
- 统一战线不等于放弃领导权
- 正面战场与敌后战场都作出贡献

【易错边界】
- 把“西安事变与抗日民族统一战线”只写成口号而不说明成立条件
- 只背“民族矛盾上升
- 和平解决符合全民族利益
- 统一战线具有广泛性和复杂性
- 抗战中坚持全面抗战路线”而不建立因果链
- 材料分析忽略“民族矛盾上升
- 和平解决符合全民族利益
- 统一战线具有广泛性和复杂性
- 抗战中坚持全面抗战路线”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 民族矛盾上升
2. 和平解决符合全民族利益
3. 统一战线具有广泛性和复杂性
4. 抗战中坚持全面抗战路线','材料角度1：和平解决不等于国共矛盾消失
材料角度2：统一战线不等于放弃领导权
材料角度3：正面战场与敌后战场都作出贡献','误区1：把“西安事变与抗日民族统一战线”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“民族矛盾上升。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：和平解决符合全民族利益。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：统一战线具有广泛性和复杂性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：抗战中坚持全面抗战路线”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“民族矛盾上升。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：和平解决符合全民族利益。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：统一战线具有广泛性和复杂性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：抗战中坚持全面抗战路线”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“西安事变与抗日民族统一战线”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “西安事变与抗日民族统一战线”解决的核心问题是什么？
2. 写出三个关键关系：民族矛盾上升；和平解决符合全民族利益；统一战线具有广泛性和复杂性。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“西安事变与抗日民族统一战线”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“西安事变与抗日民族统一战线”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“西安事变与抗日民族统一战线”只写成口号而不说明成立条件','记忆主线：西安事变和平解决成为时局转换枢纽，推动停止内战一致抗日；抗日民族统一战线坚持国共合作又坚持独立自主。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_e927bcda2e83dc8cac',NULL,'subject_politics','ch_pol_hist_soc','中共八大与社会主义建设探索','【核心命题】
中共八大正确分析社会主义改造完成后国内主要矛盾和主要任务，提出把工作重点转向发展生产力，是探索社会主义建设道路的重要成果。

【历史背景】
1. 制度确立后矛盾任务变化
2. 综合平衡和改善管理
3. 探索取得成果也经历曲折
4. 应区分正确理论成果与后来实践偏差

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 不能用后来曲折否定八大判断
- 主要矛盾表述要放在当时历史条件
- 探索经验具有长期价值

【易错边界】
- 把“中共八大与社会主义建设探索”只写成口号而不说明成立条件
- 只背“制度确立后矛盾任务变化
- 综合平衡和改善管理
- 探索取得成果也经历曲折
- 应区分正确理论成果与后来实践偏差”而不建立因果链
- 材料分析忽略“制度确立后矛盾任务变化
- 综合平衡和改善管理
- 探索取得成果也经历曲折
- 应区分正确理论成果与后来实践偏差”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','中共八大正确分析社会主义改造完成后国内主要矛盾和主要任务，提出把工作重点转向发展生产力，是探索社会主义建设道路的重要成果。','high','high','2','["专项精讲", "考研政治", "history"]','curated-politics-english-v3','9','【核心命题】
中共八大正确分析社会主义改造完成后国内主要矛盾和主要任务，提出把工作重点转向发展生产力，是探索社会主义建设道路的重要成果。

【历史背景】
1. 制度确立后矛盾任务变化
2. 综合平衡和改善管理
3. 探索取得成果也经历曲折
4. 应区分正确理论成果与后来实践偏差

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 不能用后来曲折否定八大判断
- 主要矛盾表述要放在当时历史条件
- 探索经验具有长期价值

【易错边界】
- 把“中共八大与社会主义建设探索”只写成口号而不说明成立条件
- 只背“制度确立后矛盾任务变化
- 综合平衡和改善管理
- 探索取得成果也经历曲折
- 应区分正确理论成果与后来实践偏差”而不建立因果链
- 材料分析忽略“制度确立后矛盾任务变化
- 综合平衡和改善管理
- 探索取得成果也经历曲折
- 应区分正确理论成果与后来实践偏差”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 制度确立后矛盾任务变化
2. 综合平衡和改善管理
3. 探索取得成果也经历曲折
4. 应区分正确理论成果与后来实践偏差','材料角度1：不能用后来曲折否定八大判断
材料角度2：主要矛盾表述要放在当时历史条件
材料角度3：探索经验具有长期价值','误区1：把“中共八大与社会主义建设探索”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“制度确立后矛盾任务变化。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：综合平衡和改善管理。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：探索取得成果也经历曲折。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：应区分正确理论成果与后来实践偏差”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“制度确立后矛盾任务变化。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：综合平衡和改善管理。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：探索取得成果也经历曲折。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：应区分正确理论成果与后来实践偏差”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“中共八大与社会主义建设探索”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “中共八大与社会主义建设探索”解决的核心问题是什么？
2. 写出三个关键关系：制度确立后矛盾任务变化；综合平衡和改善管理；探索取得成果也经历曲折。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“中共八大与社会主义建设探索”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“中共八大与社会主义建设探索”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“中共八大与社会主义建设探索”只写成口号而不说明成立条件','记忆主线：中共八大正确分析社会主义改造完成后国内主要矛盾和主要任务，提出把工作重点转向发展生产力，是探索社会主义建设道路的重要成果。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_261ed06018e204c013',NULL,'subject_politics','ch_pol_hist_soc','十一届三中全会与历史转折','【核心命题】
十一届三中全会重新确立解放思想实事求是思想路线，把工作中心转向社会主义现代化建设并作出改革开放决策。

【历史背景】
1. 思想路线拨乱反正
2. 政治路线转变
3. 组织路线调整
4. 改革从农村起步并向城市展开
5. 对外开放形成格局

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 转折不是一天完成而是历史过程
- 改革开放是社会主义制度自我完善
- 不能割裂前后历史时期

【易错边界】
- 把“十一届三中全会与历史转折”只写成口号而不说明成立条件
- 只背“思想路线拨乱反正
- 政治路线转变
- 组织路线调整
- 改革从农村起步并向城市展开
- 对外开放形成格局”而不建立因果链
- 材料分析忽略“思想路线拨乱反正
- 政治路线转变
- 组织路线调整
- 改革从农村起步并向城市展开
- 对外开放形成格局”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','十一届三中全会重新确立解放思想实事求是思想路线，把工作中心转向社会主义现代化建设并作出改革开放决策。','high','high','2','["专项精讲", "考研政治", "history"]','curated-politics-english-v3','10','【核心命题】
十一届三中全会重新确立解放思想实事求是思想路线，把工作中心转向社会主义现代化建设并作出改革开放决策。

【历史背景】
1. 思想路线拨乱反正
2. 政治路线转变
3. 组织路线调整
4. 改革从农村起步并向城市展开
5. 对外开放形成格局

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 转折不是一天完成而是历史过程
- 改革开放是社会主义制度自我完善
- 不能割裂前后历史时期

【易错边界】
- 把“十一届三中全会与历史转折”只写成口号而不说明成立条件
- 只背“思想路线拨乱反正
- 政治路线转变
- 组织路线调整
- 改革从农村起步并向城市展开
- 对外开放形成格局”而不建立因果链
- 材料分析忽略“思想路线拨乱反正
- 政治路线转变
- 组织路线调整
- 改革从农村起步并向城市展开
- 对外开放形成格局”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 思想路线拨乱反正
2. 政治路线转变
3. 组织路线调整
4. 改革从农村起步并向城市展开
5. 对外开放形成格局','材料角度1：转折不是一天完成而是历史过程
材料角度2：改革开放是社会主义制度自我完善
材料角度3：不能割裂前后历史时期','误区1：把“十一届三中全会与历史转折”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“思想路线拨乱反正。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：政治路线转变。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：组织路线调整。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：改革从农村起步并向城市展开。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：对外开放形成格局”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：材料分析忽略“思想路线拨乱反正。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：政治路线转变。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：组织路线调整。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：改革从农村起步并向城市展开。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：对外开放形成格局”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“十一届三中全会与历史转折”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “十一届三中全会与历史转折”解决的核心问题是什么？
2. 写出三个关键关系：思想路线拨乱反正；政治路线转变；组织路线调整。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“十一届三中全会与历史转折”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“十一届三中全会与历史转折”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“十一届三中全会与历史转折”只写成口号而不说明成立条件','记忆主线：十一届三中全会重新确立解放思想实事求是思想路线，把工作中心转向社会主义现代化建设并作出改革开放决策。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_3bc065167c0ce6af8a',NULL,'subject_politics','ch_pol_hist_soc','南方谈话与社会主义市场经济方向','【核心命题】
南方谈话回答长期束缚思想的重大问题，强调计划和市场都是经济手段、发展才是硬道理，推动改革开放和现代化进入新阶段。

【历史背景】
1. 姓资姓社判断看三个有利于
2. 市场不等于资本主义
3. 抓住机遇加快发展
4. 党的十四大明确社会主义市场经济体制目标

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 不能把市场经济等同资本主义
- 发展速度要与效益质量统一
- 历史事件与制度决策的时间关系要准确

【易错边界】
- 把“南方谈话与社会主义市场经济方向”只写成口号而不说明成立条件
- 只背“姓资姓社判断看三个有利于
- 市场不等于资本主义
- 抓住机遇加快发展
- 党的十四大明确社会主义市场经济体制目标”而不建立因果链
- 材料分析忽略“姓资姓社判断看三个有利于
- 市场不等于资本主义
- 抓住机遇加快发展
- 党的十四大明确社会主义市场经济体制目标”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','南方谈话回答长期束缚思想的重大问题，强调计划和市场都是经济手段、发展才是硬道理，推动改革开放和现代化进入新阶段。','high','high','2','["专项精讲", "考研政治", "history"]','curated-politics-english-v3','11','【核心命题】
南方谈话回答长期束缚思想的重大问题，强调计划和市场都是经济手段、发展才是硬道理，推动改革开放和现代化进入新阶段。

【历史背景】
1. 姓资姓社判断看三个有利于
2. 市场不等于资本主义
3. 抓住机遇加快发展
4. 党的十四大明确社会主义市场经济体制目标

【过程与转折】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【意义与教训】
- 不能把市场经济等同资本主义
- 发展速度要与效益质量统一
- 历史事件与制度决策的时间关系要准确

【易错边界】
- 把“南方谈话与社会主义市场经济方向”只写成口号而不说明成立条件
- 只背“姓资姓社判断看三个有利于
- 市场不等于资本主义
- 抓住机遇加快发展
- 党的十四大明确社会主义市场经济体制目标”而不建立因果链
- 材料分析忽略“姓资姓社判断看三个有利于
- 市场不等于资本主义
- 抓住机遇加快发展
- 党的十四大明确社会主义市场经济体制目标”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 姓资姓社判断看三个有利于
2. 市场不等于资本主义
3. 抓住机遇加快发展
4. 党的十四大明确社会主义市场经济体制目标','材料角度1：不能把市场经济等同资本主义
材料角度2：发展速度要与效益质量统一
材料角度3：历史事件与制度决策的时间关系要准确','误区1：把“南方谈话与社会主义市场经济方向”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“姓资姓社判断看三个有利于。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：市场不等于资本主义。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：抓住机遇加快发展。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：党的十四大明确社会主义市场经济体制目标”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“姓资姓社判断看三个有利于。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：市场不等于资本主义。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：抓住机遇加快发展。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：党的十四大明确社会主义市场经济体制目标”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“南方谈话与社会主义市场经济方向”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “南方谈话与社会主义市场经济方向”解决的核心问题是什么？
2. 写出三个关键关系：姓资姓社判断看三个有利于；市场不等于资本主义；抓住机遇加快发展。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“南方谈话与社会主义市场经济方向”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“南方谈话与社会主义市场经济方向”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“南方谈话与社会主义市场经济方向”只写成口号而不说明成立条件','记忆主线：南方谈话回答长期束缚思想的重大问题，强调计划和市场都是经济手段、发展才是硬道理，推动改革开放和现代化进入新阶段。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_939b47c5454d0a0a84',NULL,'subject_politics','ch_pol_thought','人生目的、态度与价值','【核心命题】
人生目的是人生观核心，决定人生道路和行为选择；人生态度影响面对顺逆得失的方式，人生价值包括自我价值和社会价值并以社会价值为基础。

【价值依据】
1. 服务人民奉献社会
2. 积极进取与理性务实
3. 能力贡献与责任统一
4. 评价价值既看动机也看效果
5. 个人发展与社会进步统一

【行为要求】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现实边界】
- 成功不能只以财富地位衡量
- 自我价值不等于自我中心
- 社会贡献也要尊重正当个人需要

【易错边界】
- 把“人生目的、态度与价值”只写成口号而不说明成立条件
- 只背“服务人民奉献社会
- 积极进取与理性务实
- 能力贡献与责任统一
- 评价价值既看动机也看效果
- 个人发展与社会进步统一”而不建立因果链
- 材料分析忽略“服务人民奉献社会
- 积极进取与理性务实
- 能力贡献与责任统一
- 评价价值既看动机也看效果
- 个人发展与社会进步统一”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','人生目的是人生观核心，决定人生道路和行为选择；人生态度影响面对顺逆得失的方式，人生价值包括自我价值和社会价值并以社会价值为基础。','high','high','2','["专项精讲", "考研政治", "ethics"]','curated-politics-english-v3','27','【核心命题】
人生目的是人生观核心，决定人生道路和行为选择；人生态度影响面对顺逆得失的方式，人生价值包括自我价值和社会价值并以社会价值为基础。

【价值依据】
1. 服务人民奉献社会
2. 积极进取与理性务实
3. 能力贡献与责任统一
4. 评价价值既看动机也看效果
5. 个人发展与社会进步统一

【行为要求】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现实边界】
- 成功不能只以财富地位衡量
- 自我价值不等于自我中心
- 社会贡献也要尊重正当个人需要

【易错边界】
- 把“人生目的、态度与价值”只写成口号而不说明成立条件
- 只背“服务人民奉献社会
- 积极进取与理性务实
- 能力贡献与责任统一
- 评价价值既看动机也看效果
- 个人发展与社会进步统一”而不建立因果链
- 材料分析忽略“服务人民奉献社会
- 积极进取与理性务实
- 能力贡献与责任统一
- 评价价值既看动机也看效果
- 个人发展与社会进步统一”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 服务人民奉献社会
2. 积极进取与理性务实
3. 能力贡献与责任统一
4. 评价价值既看动机也看效果
5. 个人发展与社会进步统一','材料角度1：成功不能只以财富地位衡量
材料角度2：自我价值不等于自我中心
材料角度3：社会贡献也要尊重正当个人需要','误区1：把“人生目的、态度与价值”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“服务人民奉献社会。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：积极进取与理性务实。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：能力贡献与责任统一。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：评价价值既看动机也看效果。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：个人发展与社会进步统一”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：材料分析忽略“服务人民奉献社会。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：积极进取与理性务实。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：能力贡献与责任统一。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：评价价值既看动机也看效果。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：个人发展与社会进步统一”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“人生目的、态度与价值”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “人生目的、态度与价值”解决的核心问题是什么？
2. 写出三个关键关系：服务人民奉献社会；积极进取与理性务实；能力贡献与责任统一。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“人生目的、态度与价值”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“人生目的、态度与价值”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“人生目的、态度与价值”只写成口号而不说明成立条件','记忆主线：人生目的是人生观核心，决定人生道路和行为选择；人生态度影响面对顺逆得失的方式，人生价值包括自我价值和社会价值并以社会价值为基础。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_9f4a97d09c2ef38fe8',NULL,'subject_politics','ch_pol_thought','个人理想与社会理想','【核心命题】
个人理想体现个体发展追求，社会理想反映共同奋斗目标；社会理想规定个人理想方向，个人理想实践丰富社会理想。

【价值依据】
1. 理想具有超越性实践性时代性
2. 共同理想与远大理想衔接
3. 职业选择应联系国家社会需要
4. 理想实现依靠长期行动

【行为要求】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现实边界】
- 个人理想不能脱离社会条件
- 社会理想不是压抑个性
- 把愿望当理想会忽视实践路径

【易错边界】
- 把“个人理想与社会理想”只写成口号而不说明成立条件
- 只背“理想具有超越性实践性时代性
- 共同理想与远大理想衔接
- 职业选择应联系国家社会需要
- 理想实现依靠长期行动”而不建立因果链
- 材料分析忽略“理想具有超越性实践性时代性
- 共同理想与远大理想衔接
- 职业选择应联系国家社会需要
- 理想实现依靠长期行动”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','个人理想体现个体发展追求，社会理想反映共同奋斗目标；社会理想规定个人理想方向，个人理想实践丰富社会理想。','high','high','2','["专项精讲", "考研政治", "ethics"]','curated-politics-english-v3','28','【核心命题】
个人理想体现个体发展追求，社会理想反映共同奋斗目标；社会理想规定个人理想方向，个人理想实践丰富社会理想。

【价值依据】
1. 理想具有超越性实践性时代性
2. 共同理想与远大理想衔接
3. 职业选择应联系国家社会需要
4. 理想实现依靠长期行动

【行为要求】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现实边界】
- 个人理想不能脱离社会条件
- 社会理想不是压抑个性
- 把愿望当理想会忽视实践路径

【易错边界】
- 把“个人理想与社会理想”只写成口号而不说明成立条件
- 只背“理想具有超越性实践性时代性
- 共同理想与远大理想衔接
- 职业选择应联系国家社会需要
- 理想实现依靠长期行动”而不建立因果链
- 材料分析忽略“理想具有超越性实践性时代性
- 共同理想与远大理想衔接
- 职业选择应联系国家社会需要
- 理想实现依靠长期行动”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 理想具有超越性实践性时代性
2. 共同理想与远大理想衔接
3. 职业选择应联系国家社会需要
4. 理想实现依靠长期行动','材料角度1：个人理想不能脱离社会条件
材料角度2：社会理想不是压抑个性
材料角度3：把愿望当理想会忽视实践路径','误区1：把“个人理想与社会理想”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“理想具有超越性实践性时代性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：共同理想与远大理想衔接。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：职业选择应联系国家社会需要。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：理想实现依靠长期行动”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“理想具有超越性实践性时代性。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：共同理想与远大理想衔接。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：职业选择应联系国家社会需要。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：理想实现依靠长期行动”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“个人理想与社会理想”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “个人理想与社会理想”解决的核心问题是什么？
2. 写出三个关键关系：理想具有超越性实践性时代性；共同理想与远大理想衔接；职业选择应联系国家社会需要。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“个人理想与社会理想”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“个人理想与社会理想”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“个人理想与社会理想”只写成口号而不说明成立条件','记忆主线：个人理想体现个体发展追求，社会理想反映共同奋斗目标；社会理想规定个人理想方向，个人理想实践丰富社会理想。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_65b9bdee5e5972ae1b',NULL,'subject_politics','ch_pol_thought','爱国主义与改革创新','【核心命题】
爱国主义是对祖国深厚感情和责任担当的统一，新时代爱国主义与爱社会主义、拥护祖国统一相一致，并以理性行动和改革创新体现。

【价值依据】
1. 维护统一和民族团结
2. 尊重历史文化
3. 服务现代化建设
4. 开放包容不等于民族虚无
5. 创新创造是时代要求

【行为要求】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现实边界】
- 爱国不是排外
- 网络情绪不能代替理性行动
- 传统继承要经过创造性转化创新性发展

【易错边界】
- 把“爱国主义与改革创新”只写成口号而不说明成立条件
- 只背“维护统一和民族团结
- 尊重历史文化
- 服务现代化建设
- 开放包容不等于民族虚无
- 创新创造是时代要求”而不建立因果链
- 材料分析忽略“维护统一和民族团结
- 尊重历史文化
- 服务现代化建设
- 开放包容不等于民族虚无
- 创新创造是时代要求”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','爱国主义是对祖国深厚感情和责任担当的统一，新时代爱国主义与爱社会主义、拥护祖国统一相一致，并以理性行动和改革创新体现。','high','high','2','["专项精讲", "考研政治", "ethics"]','curated-politics-english-v3','29','【核心命题】
爱国主义是对祖国深厚感情和责任担当的统一，新时代爱国主义与爱社会主义、拥护祖国统一相一致，并以理性行动和改革创新体现。

【价值依据】
1. 维护统一和民族团结
2. 尊重历史文化
3. 服务现代化建设
4. 开放包容不等于民族虚无
5. 创新创造是时代要求

【行为要求】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现实边界】
- 爱国不是排外
- 网络情绪不能代替理性行动
- 传统继承要经过创造性转化创新性发展

【易错边界】
- 把“爱国主义与改革创新”只写成口号而不说明成立条件
- 只背“维护统一和民族团结
- 尊重历史文化
- 服务现代化建设
- 开放包容不等于民族虚无
- 创新创造是时代要求”而不建立因果链
- 材料分析忽略“维护统一和民族团结
- 尊重历史文化
- 服务现代化建设
- 开放包容不等于民族虚无
- 创新创造是时代要求”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 维护统一和民族团结
2. 尊重历史文化
3. 服务现代化建设
4. 开放包容不等于民族虚无
5. 创新创造是时代要求','材料角度1：爱国不是排外
材料角度2：网络情绪不能代替理性行动
材料角度3：传统继承要经过创造性转化创新性发展','误区1：把“爱国主义与改革创新”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“维护统一和民族团结。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：尊重历史文化。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：服务现代化建设。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：开放包容不等于民族虚无。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：创新创造是时代要求”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：材料分析忽略“维护统一和民族团结。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：尊重历史文化。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：服务现代化建设。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：开放包容不等于民族虚无。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：创新创造是时代要求”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“爱国主义与改革创新”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “爱国主义与改革创新”解决的核心问题是什么？
2. 写出三个关键关系：维护统一和民族团结；尊重历史文化；服务现代化建设。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“爱国主义与改革创新”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“爱国主义与改革创新”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“爱国主义与改革创新”只写成口号而不说明成立条件','记忆主线：爱国主义是对祖国深厚感情和责任担当的统一，新时代爱国主义与爱社会主义、拥护祖国统一相一致，并以理性行动和改革创新体现。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_e8e25db5043b9f4160',NULL,'subject_politics','ch_pol_thought','集体主义道德原则','【核心命题】
集体主义强调国家、集体和个人利益根本一致，在利益冲突时以集体利益为重，同时保障个人正当利益并重视个体发展。

【价值依据】
1. 反对极端个人主义
2. 不是否定个人利益
3. 层次包括无私奉献先公后私和顾全大局
4. 制度应协调利益关系

【行为要求】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现实边界】
- 把集体主义等同牺牲一切个人利益
- 把个人正当诉求视为自私
- 口号化而缺乏公共责任实践

【易错边界】
- 把“集体主义道德原则”只写成口号而不说明成立条件
- 只背“反对极端个人主义
- 不是否定个人利益
- 层次包括无私奉献先公后私和顾全大局
- 制度应协调利益关系”而不建立因果链
- 材料分析忽略“反对极端个人主义
- 不是否定个人利益
- 层次包括无私奉献先公后私和顾全大局
- 制度应协调利益关系”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','集体主义强调国家、集体和个人利益根本一致，在利益冲突时以集体利益为重，同时保障个人正当利益并重视个体发展。','high','high','2','["专项精讲", "考研政治", "ethics"]','curated-politics-english-v3','30','【核心命题】
集体主义强调国家、集体和个人利益根本一致，在利益冲突时以集体利益为重，同时保障个人正当利益并重视个体发展。

【价值依据】
1. 反对极端个人主义
2. 不是否定个人利益
3. 层次包括无私奉献先公后私和顾全大局
4. 制度应协调利益关系

【行为要求】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【现实边界】
- 把集体主义等同牺牲一切个人利益
- 把个人正当诉求视为自私
- 口号化而缺乏公共责任实践

【易错边界】
- 把“集体主义道德原则”只写成口号而不说明成立条件
- 只背“反对极端个人主义
- 不是否定个人利益
- 层次包括无私奉献先公后私和顾全大局
- 制度应协调利益关系”而不建立因果链
- 材料分析忽略“反对极端个人主义
- 不是否定个人利益
- 层次包括无私奉献先公后私和顾全大局
- 制度应协调利益关系”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 反对极端个人主义
2. 不是否定个人利益
3. 层次包括无私奉献先公后私和顾全大局
4. 制度应协调利益关系','材料角度1：把集体主义等同牺牲一切个人利益
材料角度2：把个人正当诉求视为自私
材料角度3：口号化而缺乏公共责任实践','误区1：把“集体主义道德原则”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“反对极端个人主义。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：不是否定个人利益。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：层次包括无私奉献先公后私和顾全大局。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：制度应协调利益关系”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“反对极端个人主义。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：不是否定个人利益。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：层次包括无私奉献先公后私和顾全大局。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：制度应协调利益关系”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“集体主义道德原则”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “集体主义道德原则”解决的核心问题是什么？
2. 写出三个关键关系：反对极端个人主义；不是否定个人利益；层次包括无私奉献先公后私和顾全大局。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“集体主义道德原则”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“集体主义道德原则”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“集体主义道德原则”只写成口号而不说明成立条件','记忆主线：集体主义强调国家、集体和个人利益根本一致，在利益冲突时以集体利益为重，同时保障个人正当利益并重视个体发展。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_483a55828ae511da78',NULL,'subject_politics','ch_pol_law','法律制定、执行、适用与遵守','【核心命题】
法律运行包括科学立法、严格执法、公正司法和全民守法，各环节相互衔接，共同维护规范权威和权利秩序。

【规范依据】
1. 立法体现人民意志并符合实际
2. 行政机关依法履职
3. 司法机关独立公正行使职权
4. 公民组织自觉守法并依法维权

【权利义务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【程序责任】
- 执法不等于司法
- 有法不代表自然实现法治
- 实体正义与程序正义不可偏废

【易错边界】
- 把“法律制定、执行、适用与遵守”只写成口号而不说明成立条件
- 只背“立法体现人民意志并符合实际
- 行政机关依法履职
- 司法机关独立公正行使职权
- 公民组织自觉守法并依法维权”而不建立因果链
- 材料分析忽略“立法体现人民意志并符合实际
- 行政机关依法履职
- 司法机关独立公正行使职权
- 公民组织自觉守法并依法维权”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','法律运行包括科学立法、严格执法、公正司法和全民守法，各环节相互衔接，共同维护规范权威和权利秩序。','high','high','2','["专项精讲", "考研政治", "law"]','curated-politics-english-v3','9','【核心命题】
法律运行包括科学立法、严格执法、公正司法和全民守法，各环节相互衔接，共同维护规范权威和权利秩序。

【规范依据】
1. 立法体现人民意志并符合实际
2. 行政机关依法履职
3. 司法机关独立公正行使职权
4. 公民组织自觉守法并依法维权

【权利义务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【程序责任】
- 执法不等于司法
- 有法不代表自然实现法治
- 实体正义与程序正义不可偏废

【易错边界】
- 把“法律制定、执行、适用与遵守”只写成口号而不说明成立条件
- 只背“立法体现人民意志并符合实际
- 行政机关依法履职
- 司法机关独立公正行使职权
- 公民组织自觉守法并依法维权”而不建立因果链
- 材料分析忽略“立法体现人民意志并符合实际
- 行政机关依法履职
- 司法机关独立公正行使职权
- 公民组织自觉守法并依法维权”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 立法体现人民意志并符合实际
2. 行政机关依法履职
3. 司法机关独立公正行使职权
4. 公民组织自觉守法并依法维权','材料角度1：执法不等于司法
材料角度2：有法不代表自然实现法治
材料角度3：实体正义与程序正义不可偏废','误区1：把“法律制定、执行、适用与遵守”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“立法体现人民意志并符合实际。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：行政机关依法履职。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：司法机关独立公正行使职权。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：公民组织自觉守法并依法维权”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“立法体现人民意志并符合实际。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：行政机关依法履职。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：司法机关独立公正行使职权。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：公民组织自觉守法并依法维权”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“法律制定、执行、适用与遵守”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “法律制定、执行、适用与遵守”解决的核心问题是什么？
2. 写出三个关键关系：立法体现人民意志并符合实际；行政机关依法履职；司法机关独立公正行使职权。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“法律制定、执行、适用与遵守”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“法律制定、执行、适用与遵守”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“法律制定、执行、适用与遵守”只写成口号而不说明成立条件','记忆主线：法律运行包括科学立法、严格执法、公正司法和全民守法，各环节相互衔接，共同维护规范权威和权利秩序。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_9efb86095007e29a8a',NULL,'subject_politics','ch_pol_law','宪法基本权利与义务','【核心命题】
宪法确认公民平等、政治、宗教信仰、人身、社会经济文化等基本权利，同时规定维护统一、遵守法律、依法纳税等基本义务。

【规范依据】
1. 权利具有边界
2. 行使权利不得损害国家社会集体和他人合法权利
3. 权利义务相统一
4. 国家负有尊重保障义务

【权利义务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【程序责任】
- 自由不等于不受限制
- 只强调权利不履行义务
- 普通法律规定不得与宪法相抵触

【易错边界】
- 把“宪法基本权利与义务”只写成口号而不说明成立条件
- 只背“权利具有边界
- 行使权利不得损害国家社会集体和他人合法权利
- 权利义务相统一
- 国家负有尊重保障义务”而不建立因果链
- 材料分析忽略“权利具有边界
- 行使权利不得损害国家社会集体和他人合法权利
- 权利义务相统一
- 国家负有尊重保障义务”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','宪法确认公民平等、政治、宗教信仰、人身、社会经济文化等基本权利，同时规定维护统一、遵守法律、依法纳税等基本义务。','high','high','2','["专项精讲", "考研政治", "law"]','curated-politics-english-v3','10','【核心命题】
宪法确认公民平等、政治、宗教信仰、人身、社会经济文化等基本权利，同时规定维护统一、遵守法律、依法纳税等基本义务。

【规范依据】
1. 权利具有边界
2. 行使权利不得损害国家社会集体和他人合法权利
3. 权利义务相统一
4. 国家负有尊重保障义务

【权利义务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【程序责任】
- 自由不等于不受限制
- 只强调权利不履行义务
- 普通法律规定不得与宪法相抵触

【易错边界】
- 把“宪法基本权利与义务”只写成口号而不说明成立条件
- 只背“权利具有边界
- 行使权利不得损害国家社会集体和他人合法权利
- 权利义务相统一
- 国家负有尊重保障义务”而不建立因果链
- 材料分析忽略“权利具有边界
- 行使权利不得损害国家社会集体和他人合法权利
- 权利义务相统一
- 国家负有尊重保障义务”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 权利具有边界
2. 行使权利不得损害国家社会集体和他人合法权利
3. 权利义务相统一
4. 国家负有尊重保障义务','材料角度1：自由不等于不受限制
材料角度2：只强调权利不履行义务
材料角度3：普通法律规定不得与宪法相抵触','误区1：把“宪法基本权利与义务”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“权利具有边界。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：行使权利不得损害国家社会集体和他人合法权利。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：权利义务相统一。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：国家负有尊重保障义务”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：材料分析忽略“权利具有边界。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：行使权利不得损害国家社会集体和他人合法权利。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：权利义务相统一。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：国家负有尊重保障义务”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“宪法基本权利与义务”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “宪法基本权利与义务”解决的核心问题是什么？
2. 写出三个关键关系：权利具有边界；行使权利不得损害国家社会集体和他人合法权利；权利义务相统一。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“宪法基本权利与义务”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“宪法基本权利与义务”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“宪法基本权利与义务”只写成口号而不说明成立条件','记忆主线：宪法确认公民平等、政治、宗教信仰、人身、社会经济文化等基本权利，同时规定维护统一、遵守法律、依法纳税等基本义务。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
INSERT INTO knowledge_points (id,owner_id,subject_id,chapter_id,title,content,summary,importance,frequency,level,tags,source,sort_order,base_content,key_points,case_analysis,common_mistakes,training_steps,self_test,answer_template,exam_tips,memory_tips,quality_version) VALUES ('kp_pe_5152741a608c3dd5c3',NULL,'subject_politics','ch_pol_law','法治思维与程序正义','【核心命题】
法治思维要求以法律规范、权利义务、权限程序和责任后果分析问题；程序正义通过公开参与回避救济等机制限制权力并保障实体结果可信。

【规范依据】
1. 职权法定
2. 权利保障
3. 公平正义
4. 权力制约
5. 正当程序
6. 违法承担责任

【权利义务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【程序责任】
- 结果正确不能弥补严重程序违法
- 程序不是形式负担
- 依法维权应使用法定渠道并保存证据

【易错边界】
- 把“法治思维与程序正义”只写成口号而不说明成立条件
- 只背“职权法定
- 权利保障
- 公平正义
- 权力制约
- 正当程序
- 违法承担责任”而不建立因果链
- 材料分析忽略“职权法定
- 权利保障
- 公平正义
- 权力制约
- 正当程序
- 违法承担责任”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','法治思维要求以法律规范、权利义务、权限程序和责任后果分析问题；程序正义通过公开参与回避救济等机制限制权力并保障实体结果可信。','high','high','2','["专项精讲", "考研政治", "law"]','curated-politics-english-v3','11','【核心命题】
法治思维要求以法律规范、权利义务、权限程序和责任后果分析问题；程序正义通过公开参与回避救济等机制限制权力并保障实体结果可信。

【规范依据】
1. 职权法定
2. 权利保障
3. 公平正义
4. 权力制约
5. 正当程序
6. 违法承担责任

【权利义务】
必须把概念写成关系链，而不是罗列名词：前提条件→主体与对象→关键机制→直接结果→长期影响→适用边界。

【程序责任】
- 结果正确不能弥补严重程序违法
- 程序不是形式负担
- 依法维权应使用法定渠道并保存证据

【易错边界】
- 把“法治思维与程序正义”只写成口号而不说明成立条件
- 只背“职权法定
- 权利保障
- 公平正义
- 权力制约
- 正当程序
- 违法承担责任”而不建立因果链
- 材料分析忽略“职权法定
- 权利保障
- 公平正义
- 权力制约
- 正当程序
- 违法承担责任”这一边界

【材料题落点】
先提取材料中的主体、措施、矛盾和结果，再选择本知识点中能够解释因果关系的规则。每写一个理论句，紧跟一个材料对应句；结尾必须补充条件、阶段或统筹关系，避免把正确原理写成绝对化口号。','1. 职权法定
2. 权利保障
3. 公平正义
4. 权力制约
5. 正当程序
6. 违法承担责任','材料角度1：结果正确不能弥补严重程序违法
材料角度2：程序不是形式负担
材料角度3：依法维权应使用法定渠道并保存证据','误区1：把“法治思维与程序正义”只写成口号而不说明成立条件。纠正：回到概念层级、历史条件或因果方向重新作答。
误区2：只背“职权法定。纠正：回到概念层级、历史条件或因果方向重新作答。
误区3：权利保障。纠正：回到概念层级、历史条件或因果方向重新作答。
误区4：公平正义。纠正：回到概念层级、历史条件或因果方向重新作答。
误区5：权力制约。纠正：回到概念层级、历史条件或因果方向重新作答。
误区6：正当程序。纠正：回到概念层级、历史条件或因果方向重新作答。
误区7：违法承担责任”而不建立因果链。纠正：回到概念层级、历史条件或因果方向重新作答。
误区8：材料分析忽略“职权法定。纠正：回到概念层级、历史条件或因果方向重新作答。
误区9：权利保障。纠正：回到概念层级、历史条件或因果方向重新作答。
误区10：公平正义。纠正：回到概念层级、历史条件或因果方向重新作答。
误区11：权力制约。纠正：回到概念层级、历史条件或因果方向重新作答。
误区12：正当程序。纠正：回到概念层级、历史条件或因果方向重新作答。
误区13：违法承担责任”这一边界。纠正：回到概念层级、历史条件或因果方向重新作答。','1. 闭卷写出“法治思维与程序正义”的核心命题，并把它压缩成一条不少于5环的机制链。
2. 将本知识点与同章相邻概念做对象、层级、条件、结论四维辨析。
3. 自拟一段120字材料，至少埋入两个可定位到本知识点的证据词，再写出对应分析。
4. 用10分钟完成一道6分简答，再用20分钟完成一道材料分析；第二遍删掉不能产生得分的套话。
5. 按“概念准确4分、关系完整6分、材料结合6分、边界意识4分”自评并改写。','1. “法治思维与程序正义”解决的核心问题是什么？
2. 写出三个关键关系：职权法定；权利保障；公平正义。
3. 材料出现哪些事实时可以调用本知识点？
4. 以下判断为什么不完整：“把“法治思维与程序正义”只写成口号而不说明成立条件”？
5. 设计一道与当前中国实践或历史材料结合的分析题，并列出至少5个评分点。','政治主观题采用“定性—展开—材料—边界—结论”结构：第一段准确界定“法治思维与程序正义”；中间按规则逐点解释，每点必须包含理论关系和材料证据；随后处理阶段条件、统筹关系或常见反例；最后回扣题目任务。不得用同一套万能段落替换具体原理。','重点检查：把“法治思维与程序正义”只写成口号而不说明成立条件','记忆主线：法治思维要求以法律规范、权利义务、权限程序和责任后果分析问题；程序正义通过公开参与回避救济等机制限制权力并保障实体结果可信。','3') ON CONFLICT(id) DO UPDATE SET title=excluded.title,content=excluded.content,summary=excluded.summary,importance=excluded.importance,frequency=excluded.frequency,level=excluded.level,tags=excluded.tags,source=excluded.source,sort_order=excluded.sort_order,base_content=excluded.base_content,key_points=excluded.key_points,case_analysis=excluded.case_analysis,common_mistakes=excluded.common_mistakes,training_steps=excluded.training_steps,self_test=excluded.self_test,answer_template=excluded.answer_template,exam_tips=excluded.exam_tips,memory_tips=excluded.memory_tips,quality_version=excluded.quality_version;
