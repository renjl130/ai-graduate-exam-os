/**
 * 院校数据 - 支持多所高校
 */

export interface SchoolInfo {
  id: string;
  name: string;
  major: string;
  code: string;
  department: string;
  level: string;
  location: string;
  duration: string;
  tuition: string;
  examSubjects: { code: string; name: string; score: number }[];
  scoreLines: { year: number; total: number; politics: number; english: number; major: number; enrolled: number; applicants: number }[];
  referenceBooks334: { name: string; author: string; importance: number }[];
  referenceBooks440: { name: string; author: string; importance: number }[];
  features: string[];
}

export const schools: SchoolInfo[] = [
  {
    id: "szu",
    name: "深圳大学",
    major: "新闻与传播（MJC）",
    code: "055200",
    department: "传播学院",
    level: "双一流建设高校",
    location: "深圳市南山区",
    duration: "3年",
    tuition: "约1.8万/年",
    examSubjects: [
      { code: "101", name: "思想政治理论", score: 100 },
      { code: "204", name: "英语二", score: 100 },
      { code: "334", name: "新闻与传播专业综合能力", score: 150 },
      { code: "440", name: "新闻与传播专业基础", score: 150 },
    ],
    scoreLines: [
      { year: 2025, total: 370, politics: 55, english: 55, major: 83, enrolled: 40, applicants: 600 },
      { year: 2024, total: 368, politics: 54, english: 54, major: 81, enrolled: 38, applicants: 580 },
      { year: 2023, total: 365, politics: 54, english: 54, major: 81, enrolled: 35, applicants: 520 },
      { year: 2022, total: 370, politics: 56, english: 56, major: 84, enrolled: 32, applicants: 500 },
      { year: 2021, total: 358, politics: 53, english: 53, major: 80, enrolled: 30, applicants: 450 },
    ],
    referenceBooks334: [
      { name: "《新闻采访与写作》", author: "丁柏铨", importance: 5 },
      { name: "《新闻编辑学》", author: "蔡雯", importance: 4 },
      { name: "《当代新闻评论教程》", author: "丁法章", importance: 4 },
      { name: "《广告学概论》", author: "陈培爱", importance: 4 },
      { name: "《公共关系学》", author: "居延安", importance: 3 },
      { name: "《网络传播概论》（第4版）", author: "彭兰", importance: 5 },
    ],
    referenceBooks440: [
      { name: "《新闻学概论》（第7版）", author: "李良荣", importance: 5 },
      { name: "《传播学教程》（第2版）", author: "郭庆光", importance: 5 },
      { name: "《中国新闻传播史》", author: "方汉奇", importance: 4 },
      { name: "《外国新闻传播史》", author: "郑超然", importance: 3 },
      { name: "《新媒体导论》", author: "彭兰", importance: 5 },
      { name: "《网络与新媒体概论》", author: "李良荣", importance: 4 },
    ],
    features: [
      "华南地区最早设立的新闻传播学院之一",
      "新闻传播学一级学科硕士点",
      "学科特色：新媒体研究、数字传播、文化产业",
      "地处深圳，毗邻港澳，传媒资源丰富",
      "知名校友和业界合作广泛",
    ],
  },
  {
    id: "pku",
    name: "北京大学",
    major: "新闻与传播（MJC）",
    code: "055200",
    department: "新闻与传播学院",
    level: "985/211/双一流",
    location: "北京市海淀区",
    duration: "2年",
    tuition: "约4万/年",
    examSubjects: [
      { code: "101", name: "思想政治理论", score: 100 },
      { code: "204", name: "英语二", score: 100 },
      { code: "334", name: "新闻与传播专业综合能力", score: 150 },
      { code: "440", name: "新闻与传播专业基础", score: 150 },
    ],
    scoreLines: [
      { year: 2025, total: 385, politics: 55, english: 55, major: 90, enrolled: 30, applicants: 800 },
      { year: 2024, total: 382, politics: 55, english: 55, major: 90, enrolled: 28, applicants: 750 },
      { year: 2023, total: 380, politics: 55, english: 55, major: 90, enrolled: 25, applicants: 700 },
    ],
    referenceBooks334: [
      { name: "《新闻采访学》", author: "蓝鸿文", importance: 5 },
      { name: "《新闻写作教程》", author: "刘明华", importance: 5 },
      { name: "《新闻编辑学》", author: "蔡雯", importance: 4 },
    ],
    referenceBooks440: [
      { name: "《新闻理论十讲》", author: "陈力丹", importance: 5 },
      { name: "《传播学教程》", author: "郭庆光", importance: 5 },
      { name: "《中国新闻传播史》", author: "方汉奇", importance: 4 },
    ],
    features: [
      "中国新闻传播教育的最高学府",
      "新闻传播学一级学科博士点",
      "学科特色：国际传播、新媒体研究、舆情分析",
      "地处北京，媒体资源丰富",
      "师资力量雄厚，学术氛围浓厚",
    ],
  },
  {
    id: "fudan",
    name: "复旦大学",
    major: "新闻与传播（MJC）",
    code: "055200",
    department: "新闻学院",
    level: "985/211/双一流",
    location: "上海市杨浦区",
    duration: "2年",
    tuition: "约3万/年",
    examSubjects: [
      { code: "101", name: "思想政治理论", score: 100 },
      { code: "204", name: "英语二", score: 100 },
      { code: "334", name: "新闻与传播专业综合能力", score: 150 },
      { code: "440", name: "新闻与传播专业基础", score: 150 },
    ],
    scoreLines: [
      { year: 2025, total: 380, politics: 55, english: 55, major: 90, enrolled: 35, applicants: 700 },
      { year: 2024, total: 378, politics: 55, english: 55, major: 90, enrolled: 32, applicants: 680 },
      { year: 2023, total: 375, politics: 55, english: 55, major: 90, enrolled: 30, applicants: 650 },
    ],
    referenceBooks334: [
      { name: "《新闻采访与写作》", author: "丁柏铨", importance: 5 },
      { name: "《新闻编辑学》", author: "蔡雯", importance: 4 },
    ],
    referenceBooks440: [
      { name: "《新闻学概论》", author: "李良荣", importance: 5 },
      { name: "《传播学教程》", author: "郭庆光", importance: 5 },
    ],
    features: [
      "中国历史最悠久的新闻传播教育机构",
      "新闻传播学一级学科博士点",
      "学科特色：国际传播、数据新闻、智能传播",
      "地处上海，媒体资源丰富",
      "校友网络广泛，业界认可度高",
    ],
  },
  {
    id: "ruc",
    name: "中国人民大学",
    major: "新闻与传播（MJC）",
    code: "055200",
    department: "新闻学院",
    level: "985/211/双一流",
    location: "北京市海淀区",
    duration: "2年",
    tuition: "约2万/年",
    examSubjects: [
      { code: "101", name: "思想政治理论", score: 100 },
      { code: "204", name: "英语二", score: 100 },
      { code: "334", name: "新闻与传播专业综合能力", score: 150 },
      { code: "440", name: "新闻与传播专业基础", score: 150 },
    ],
    scoreLines: [
      { year: 2025, total: 382, politics: 55, english: 55, major: 90, enrolled: 40, applicants: 750 },
      { year: 2024, total: 380, politics: 55, english: 55, major: 90, enrolled: 38, applicants: 720 },
      { year: 2023, total: 378, politics: 55, english: 55, major: 90, enrolled: 35, applicants: 680 },
    ],
    referenceBooks334: [
      { name: "《新闻采访学》", author: "蓝鸿文", importance: 5 },
      { name: "《新闻写作教程》", author: "刘明华", importance: 5 },
    ],
    referenceBooks440: [
      { name: "《新闻理论十讲》", author: "陈力丹", importance: 5 },
      { name: "《传播学教程》", author: "郭庆光", importance: 5 },
    ],
    features: [
      "中国共产党创办的第一所新闻教育机构",
      "新闻传播学一级学科博士点",
      "学科特色：马克思主义新闻观、舆论学、传媒经济",
      "地处北京，政策资源丰富",
      "学术研究实力雄厚",
    ],
  },
  {
    id: "tsu",
    name: "清华大学",
    major: "新闻与传播（MJC）",
    code: "055200",
    department: "新闻与传播学院",
    level: "985/211/双一流",
    location: "北京市海淀区",
    duration: "2年",
    tuition: "约4万/年",
    examSubjects: [
      { code: "101", name: "思想政治理论", score: 100 },
      { code: "204", name: "英语二", score: 100 },
      { code: "334", name: "新闻与传播专业综合能力", score: 150 },
      { code: "440", name: "新闻与传播专业基础", score: 150 },
    ],
    scoreLines: [
      { year: 2025, total: 388, politics: 55, english: 55, major: 90, enrolled: 25, applicants: 600 },
      { year: 2024, total: 385, politics: 55, english: 55, major: 90, enrolled: 23, applicants: 580 },
      { year: 2023, total: 382, politics: 55, english: 55, major: 90, enrolled: 20, applicants: 550 },
    ],
    referenceBooks334: [
      { name: "《新闻采访与写作》", author: "丁柏铨", importance: 5 },
      { name: "《新闻编辑学》", author: "蔡雯", importance: 4 },
    ],
    referenceBooks440: [
      { name: "《新闻学概论》", author: "李良荣", importance: 5 },
      { name: "《传播学教程》", author: "郭庆光", importance: 5 },
    ],
    features: [
      "国际一流新闻传播学院",
      "新闻传播学一级学科博士点",
      "学科特色：国际传播、智能传播、计算传播",
      "地处北京，学术资源丰富",
      "国际化程度高，海外交流机会多",
    ],
  },
  {
    id: "whu",
    name: "武汉大学",
    major: "新闻与传播（MJC）",
    code: "055200",
    department: "新闻与传播学院",
    level: "985/211/双一流",
    location: "武汉市武昌区",
    duration: "2年",
    tuition: "约1.3万/年",
    examSubjects: [
      { code: "101", name: "思想政治理论", score: 100 },
      { code: "204", name: "英语二", score: 100 },
      { code: "334", name: "新闻与传播专业综合能力", score: 150 },
      { code: "440", name: "新闻与传播专业基础", score: 150 },
    ],
    scoreLines: [
      { year: 2025, total: 375, politics: 55, english: 55, major: 90, enrolled: 45, applicants: 650 },
      { year: 2024, total: 372, politics: 55, english: 55, major: 90, enrolled: 42, applicants: 620 },
      { year: 2023, total: 370, politics: 55, english: 55, major: 90, enrolled: 40, applicants: 580 },
    ],
    referenceBooks334: [
      { name: "《新闻采访与写作》", author: "丁柏铨", importance: 5 },
      { name: "《新闻编辑学》", author: "蔡雯", importance: 4 },
    ],
    referenceBooks440: [
      { name: "《新闻学概论》", author: "李良荣", importance: 5 },
      { name: "《传播学教程》", author: "郭庆光", importance: 5 },
    ],
    features: [
      "中国历史最悠久的新闻传播教育机构之一",
      "新闻传播学一级学科博士点",
      "学科特色：新闻传播理论、网络传播、广告学",
      "地处武汉，中部地区传媒中心",
      "学术氛围浓厚，科研实力强",
    ],
  },
  {
    id: "zju",
    name: "浙江大学",
    major: "新闻与传播（MJC）",
    code: "055200",
    department: "传媒与国际文化学院",
    level: "985/211/双一流",
    location: "杭州市西湖区",
    duration: "2年",
    tuition: "约2万/年",
    examSubjects: [
      { code: "101", name: "思想政治理论", score: 100 },
      { code: "204", name: "英语二", score: 100 },
      { code: "334", name: "新闻与传播专业综合能力", score: 150 },
      { code: "440", name: "新闻与传播专业基础", score: 150 },
    ],
    scoreLines: [
      { year: 2025, total: 378, politics: 55, english: 55, major: 90, enrolled: 30, applicants: 500 },
      { year: 2024, total: 375, politics: 55, english: 55, major: 90, enrolled: 28, applicants: 480 },
      { year: 2023, total: 372, politics: 55, english: 55, major: 90, enrolled: 25, applicants: 450 },
    ],
    referenceBooks334: [
      { name: "《新闻采访与写作》", author: "丁柏铨", importance: 5 },
      { name: "《新闻编辑学》", author: "蔡雯", importance: 4 },
    ],
    referenceBooks440: [
      { name: "《新闻学概论》", author: "李良荣", importance: 5 },
      { name: "《传播学教程》", author: "郭庆光", importance: 5 },
    ],
    features: [
      "综合性大学新闻传播学科",
      "新闻传播学一级学科硕士点",
      "学科特色：数字媒体、智能传播、跨文化传播",
      "地处杭州，互联网产业发达",
      "交叉学科优势明显",
    ],
  },
  {
    id: "xmu",
    name: "厦门大学",
    major: "新闻与传播（MJC）",
    code: "055200",
    department: "新闻传播学院",
    level: "985/211/双一流",
    location: "厦门市思明区",
    duration: "3年",
    tuition: "约1.1万/年",
    examSubjects: [
      { code: "101", name: "思想政治理论", score: 100 },
      { code: "204", name: "英语二", score: 100 },
      { code: "334", name: "新闻与传播专业综合能力", score: 150 },
      { code: "440", name: "新闻与传播专业基础", score: 150 },
    ],
    scoreLines: [
      { year: 2025, total: 370, politics: 55, english: 55, major: 90, enrolled: 35, applicants: 450 },
      { year: 2024, total: 368, politics: 55, english: 55, major: 90, enrolled: 33, applicants: 430 },
      { year: 2023, total: 365, politics: 55, english: 55, major: 90, enrolled: 30, applicants: 400 },
    ],
    referenceBooks334: [
      { name: "《新闻采访与写作》", author: "丁柏铨", importance: 5 },
      { name: "《新闻编辑学》", author: "蔡雯", importance: 4 },
    ],
    referenceBooks440: [
      { name: "《新闻学概论》", author: "李良荣", importance: 5 },
      { name: "《传播学教程》", author: "郭庆光", importance: 5 },
    ],
    features: [
      "东南地区知名新闻传播学院",
      "新闻传播学一级学科硕士点",
      "学科特色：海峡两岸传播、广告学、公共关系",
      "地处厦门，环境优美",
      "侨乡特色，对外交流活跃",
    ],
  },
];

export function getSchoolById(id: string): SchoolInfo | undefined {
  return schools.find(s => s.id === id);
}

export function getSchoolNames(): { id: string; name: string }[] {
  return schools.map(s => ({ id: s.id, name: s.name }));
}
