PRAGMA foreign_keys = ON;

-- Seed chapters chunk 1/1

INSERT OR REPLACE INTO "chapters" ("id", "subject_id", "parent_id", "name", "description", "sort_order", "level", "created_at") VALUES
  ('ch_xc_cbs_base', 'subject_xinchuan', NULL, '传播学基础', '传播学基本概念与研究方法', 1, 1, '2026-06-10 14:48:49'),
  ('ch_xc_cbs_type', 'subject_xinchuan', NULL, '传播类型', '自我传播、人际传播、群体传播、组织传播、大众传播', 2, 1, '2026-06-10 14:48:49'),
  ('ch_xc_cbs_model', 'subject_xinchuan', NULL, '传播模式', '拉斯韦尔5W、香农-韦弗、施拉姆等经典传播模式', 3, 1, '2026-06-10 14:48:49'),
  ('ch_xc_cbs_comm', 'subject_xinchuan', NULL, '传播者研究', '把关人理论、媒介组织、新闻专业主义', 4, 1, '2026-06-10 14:48:49'),
  ('ch_xc_cbs_media', 'subject_xinchuan', NULL, '媒介研究', '媒介环境学派、麦克卢汉、媒介融合', 5, 1, '2026-06-10 14:48:49'),
  ('ch_xc_cbs_aud', 'subject_xinchuan', NULL, '受众研究', '使用与满足、受众商品论、编码解码', 6, 1, '2026-06-10 14:48:49'),
  ('ch_xc_cbs_effect', 'subject_xinchuan', NULL, '效果研究', '议程设置、沉默螺旋、培养理论、框架理论、知沟、信息茧房', 7, 1, '2026-06-10 14:48:49'),
  ('ch_xc_cbs_crit', 'subject_xinchuan', NULL, '批判学派', '文化研究、政治经济学、公共领域', 8, 1, '2026-06-10 14:48:49'),
  ('ch_xc_cbs_intl', 'subject_xinchuan', NULL, '国际传播', '信息主权、文化帝国主义、国际传播秩序', 9, 1, '2026-06-10 14:48:49'),
  ('ch_xc_xw_base', 'subject_xinchuan', NULL, '新闻基础', '新闻定义、新闻价值、真实性、客观性', 10, 1, '2026-06-10 14:48:49'),
  ('ch_xc_xw_biz', 'subject_xinchuan', NULL, '新闻业务', '采访、写作、编辑、评论', 11, 1, '2026-06-10 14:48:49'),
  ('ch_xc_xw_sys', 'subject_xinchuan', NULL, '新闻体制', '新闻自由、新闻法规、媒体伦理', 12, 1, '2026-06-10 14:48:49'),
  ('ch_xc_xw_hist', 'subject_xinchuan', NULL, '新闻史', '中国新闻传播史、外国新闻传播史', 13, 1, '2026-06-10 14:48:49'),
  ('ch_xc_wl_base', 'subject_xinchuan', NULL, '网络传播基础', '互联网传播特征、网络舆论、网络伦理', 14, 1, '2026-06-10 14:48:49'),
  ('ch_xc_wl_newmedia', 'subject_xinchuan', NULL, '新媒体形态', '社交媒体、短视频、直播', 15, 1, '2026-06-10 14:48:49'),
  ('ch_xc_wl_tech', 'subject_xinchuan', NULL, '新媒体技术', '算法推荐、大数据、人工智能', 16, 1, '2026-06-10 14:48:49'),
  ('ch_xc_wl_fusion', 'subject_xinchuan', NULL, '媒体融合', '融媒体、县级融媒体、智慧媒体', 17, 1, '2026-06-10 14:48:49'),
  ('ch_xc_ad_base', 'subject_xinchuan', NULL, '广告学基础', '广告定义、功能、发展史', 18, 1, '2026-06-10 14:48:49'),
  ('ch_xc_ad_plan', 'subject_xinchuan', NULL, '广告策划', '创意、文案、媒介', 19, 1, '2026-06-10 14:48:49'),
  ('ch_xc_pr', 'subject_xinchuan', NULL, '公共关系学', '公关定义、职能、危机公关', 20, 1, '2026-06-10 14:48:49');

INSERT OR REPLACE INTO "chapters" ("id", "subject_id", "parent_id", "name", "description", "sort_order", "level", "created_at") VALUES
  ('ch_xc_mgmt', 'subject_xinchuan', NULL, '媒介经营管理', '媒介市场、盈利模式、管理', 21, 1, '2026-06-10 14:48:49'),
  ('ch_pol_my_phil', 'subject_politics', NULL, '马克思主义哲学', '唯物论、辩证法、认识论、唯物史观', 1, 1, '2026-06-10 14:48:49'),
  ('ch_pol_my_pe', 'subject_politics', NULL, '马克思主义政治经济学', '劳动价值论、剩余价值论、资本积累', 2, 1, '2026-06-10 14:48:49'),
  ('ch_pol_my_soc', 'subject_politics', NULL, '科学社会主义', '社会主义从空想到科学、共产主义', 3, 1, '2026-06-10 14:48:49'),
  ('ch_pol_mao', 'subject_politics', NULL, '毛泽东思想', '新民主主义革命、社会主义改造', 4, 1, '2026-06-10 14:48:49'),
  ('ch_pol_deng', 'subject_politics', NULL, '邓小平理论', '社会主义本质、改革开放', 5, 1, '2026-06-10 14:48:49'),
  ('ch_pol_xi', 'subject_politics', NULL, '习近平新时代', '新时代矛盾、五位一体、四个全面', 6, 1, '2026-06-10 14:48:49'),
  ('ch_pol_hist_old', 'subject_politics', NULL, '旧民主主义革命', '鸦片战争到辛亥革命', 7, 1, '2026-06-10 14:48:49'),
  ('ch_pol_hist_new', 'subject_politics', NULL, '新民主主义革命', '五四运动到新中国成立', 8, 1, '2026-06-10 14:48:49'),
  ('ch_pol_hist_soc', 'subject_politics', NULL, '社会主义建设', '新中国成立到改革开放', 9, 1, '2026-06-10 14:48:49'),
  ('ch_pol_thought', 'subject_politics', NULL, '思想道德修养', '人生观、理想信念、核心价值观', 10, 1, '2026-06-10 14:48:49'),
  ('ch_pol_law', 'subject_politics', NULL, '法治素养', '法律体系、法治思维', 11, 1, '2026-06-10 14:48:49'),
  ('ch_eng_vocab', 'subject_english', NULL, '词汇', '高频核心词汇、词组、同义替换', 1, 1, '2026-06-10 14:48:49'),
  ('ch_eng_grammar', 'subject_english', NULL, '语法', '句子结构、从句、非谓语、时态', 2, 1, '2026-06-10 14:48:49'),
  ('ch_eng_long', 'subject_english', NULL, '长难句', '长难句拆解方法、真题精选', 3, 1, '2026-06-10 14:48:49'),
  ('ch_eng_read', 'subject_english', NULL, '阅读', '阅读技巧、真题精讲', 4, 1, '2026-06-10 14:48:49'),
  ('ch_eng_trans', 'subject_english', NULL, '翻译', '翻译技巧、真题翻译', 5, 1, '2026-06-10 14:48:49'),
  ('ch_eng_new', 'subject_english', NULL, '新题型', '七选五、排序题、标题匹配', 6, 1, '2026-06-10 14:48:49'),
  ('ch_eng_write', 'subject_english', NULL, '作文', '小作文模板、大作文模板、高分句型', 7, 1, '2026-06-10 14:48:49'),
  ('ch_xc_method', 'subject_xinchuan', NULL, '新闻传播研究方法', '定量、定性、数字方法与研究设计', 22, 1, '2026-07-14 14:04:01');

INSERT OR REPLACE INTO "chapters" ("id", "subject_id", "parent_id", "name", "description", "sort_order", "level", "created_at") VALUES
  ('ch_xc_practice', 'subject_xinchuan', NULL, '融合新闻实务', '消息、评论、策划、数据与融合报道', 23, 1, '2026-07-14 14:04:01'),
  ('ch_xc_hot', 'subject_xinchuan', NULL, '新传前沿专题', '平台、算法、人工智能与全球传播热点', 24, 1, '2026-07-14 14:04:01'),
  ('ch_pol_current', 'subject_politics', NULL, '形势与政策及当代世界经济政治', '年度时政、国际格局与中国外交', 12, 1, '2026-07-14 14:04:01'),
  ('ch_eng_cloze', 'subject_english', NULL, '完形填空', '语篇逻辑、词义辨析与固定搭配', 8, 1, '2026-07-14 14:04:01');
