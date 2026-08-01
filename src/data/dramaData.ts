export interface Character {
  id: string;
  name: string;
  role: string;
  age: number;
  avatarPrompt: string;
  appearance: string;
  personality: string;
  motive: string;
  imagePlaceholder: string;
}

export interface EpisodeLogline {
  epNumber: number;
  title: string;
  arcTitle: string;
  arcNumber: number;
  logline: string;
  isClimax: boolean;
  intensityScore: number; // 1 to 10
}

export interface ScriptScene {
  sceneNumber: number;
  location: string;
  timeOfDay: string;
  visual: string;
  cameraDirection: string;
  dialogue: {
    character: string;
    action?: string;
    text: string;
  }[];
  midjourneyPrompt: string;
  klingVideoPrompt: string;
  elevenLabsSettings?: string;
  sunoMusicPrompt?: string;
}

export interface EpisodeScript {
  epNumber: number;
  title: string;
  wordCount: number;
  estimatedDuration: string;
  hookOpening: string;
  sixStepsGuide?: Record<string, string>;
  scenes: ScriptScene[];
  moralLesson: string;
}

export const MAIN_PLOT = {
  title: "เงาเพลิงแค้น ล้างบาประธานซาตาน",
  englishTitle: "Shadow of Vengeance: The Crimson Rebirth",
  genre: "ดราม่าล้างแค้น / ละครคุณธรรมสะท้อนสังคม (Revenge Moral Drama)",
  totalEpisodes: 60,
  episodeDuration: "5 นาทีต่อตอน",
  targetAudience: "ผู้ชมคลิปสั้น TikTok, Reels, Shorts, Kuaishou (อายุ 18-50 ปี)",
  synopsis: `กวินตรา (มุก) หญิงสาวจิตใจดีผู้ทุ่มเทมอบงานวิจัยอสังหาฯ และทรัพย์สินทั้งหมดให้ "ภพธรรม" สามีผู้โลภมาก แต่กลับถูกสามีและ "นรีรัตน์" ชู้รักหลอกให้เซ็นมอบหุ้นบริษัท ยึดทุกสิ่งไปอย่างรุนแรง และผลักเธอตกจากดาดฟ้าอาคารสูง 50 ชั้นในคืนฝนตกหวังฆ่าปิดปาก 

แต่กวินตราปาฏิหาริย์รอดชีวิตด้วยการช่วยเหลือของ "คิริณ" มหาเศรษฐีลึกลับผู้อยู่เบื้องหลังกลุ่มทุนระดับโลก เขาช่วยศัลยกรรมใบหน้าและฝึกฝนเธอให้กลายเป็น "มาดามเอวา" นักลงทุนผู้ทรงอิทธิพล 3 ปีต่อมา เอวาหวนกลับมาในคราบสตรีผู้สง่างามเพื่อล้มล้างอาณาจักรของภพธรรมทีละชิ้น ผ่านเกมการเงิน จิตวิทยา และการแฉเบื้องหลังคอร์รัปชัน โดยมีไคลแมกซ์พลิกผันทุกๆ 10 ตอน และตบท้ายด้วยบทเรียนคุณธรรมสุดซาบซึ้ง`,
  moralTheme: "ความโลภก่อเกิดเพลิงเผาผลาญตนเอง... แต่ความยุติธรรมคือสายลมที่ไม่มีวันมอดดับ"
};

export const CHARACTERS: Character[] = [
  {
    id: "eva",
    name: "กวินตรา / มาดามเอวา (Kavintra / Madame Eva)",
    role: "นางเอกผู้ฟื้นจากความตาย (Protagonist / Avenger)",
    age: 29,
    avatarPrompt: "Cinematic portrait of a stunning 29yo East Asian woman with sharp confident eyes, wearing a tailor-made crimson suit jacket, subtle tiny scar near left temple, rain reflections, soft backlight, high fashion revenge aesthetic, photorealistic 8k, Arri Alexa lighting --ar 9:16 --style raw",
    appearance: "สตรีสวยคมเฉียบ สูงโปร่ง สายตานิ่งสงบแต่ลึกซึ้ง แต่งกายด้วยชุดสูทสีแดงเข้มหรือดำทรงเรียบหรู มีรอยแผลเป็นรูปหยดน้ำตาเล็กๆ ใกล้ขมับซ้าย",
    personality: "ฉลาดหลักแหลม นิ่งสงบ เลือดเย็นกับคนชั่ว แต่มีเมตตากับคนบริสุทธิ์ วางแผนล่วงหน้า 10 ก้าว",
    motive: "คืนความยุติธรรมให้ตัวเอง สั่งสอนคนโลภ และใช้ความจริงพิพากษาซาตานในคราบคนดี",
    imagePlaceholder: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "phob",
    name: "ภพธรรม (Phobtham / Master Phob)",
    role: "ตัวร้ายหลัก / ประธานซาตาน (Antagonist / Greedy CEO)",
    age: 33,
    avatarPrompt: "Cinematic portrait of a 33yo East Asian male CEO, wearing an expensive navy custom suit, gold luxury watch, arrogant and manipulative smile, dark moody background, highly detailed skin texture, cinematic photorealistic 8k --ar 9:16",
    appearance: "ชายหนุ่มบุคลิกดี ใส่สูทราคาแพง นาฬิกาเรือนทอง หน้าตาหล่อเหลาแต่อบอุมไปด้วยความทะเยอทะยานและสายตาเหี้ยมโหด",
    personality: "โลภมาก หิวอำนาจ เสแสร้งเป็นคนดีหน้ากล้อง ละโมบ ไม่เคยเห็นคุณค่าของความรักแท้ ยอมทำลายทุกคนเพื่อผลประโยชน์",
    motive: "ฮุบบริษัทอสังหาฯ หมื่นล้านและครอบครองอำนาจสูงสุดในวงการธุรกิจโดยไม่เลือกวิธีการ",
    imagePlaceholder: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "kirin",
    name: "คิริณ (Kirin / The Shadow Investor)",
    role: "พระเอก / ผู้สนับสนุนเบื้องหลัง (Ally & Mysterious Billionaire)",
    age: 35,
    avatarPrompt: "Cinematic portrait of a 35yo mysterious East Asian billionaire, charcoal shirt, thin round wire-rimmed glasses, calm calculating gaze, background of dark luxury high-rise office at night, dramatic volumetric lighting, photorealistic 8k --ar 9:16",
    appearance: "ชายหนุ่มลุคลึกลับ สูงสมาร์ท สวมเสื้อเชิ้ตสีเทาเข้ม ใส่แว่นสายตากรอบบาง สายตาแหลมคมมองเห็นจุดอ่อนของมนุษย์",
    personality: "เยือกเย็น สุขุม พูดน้อยแต่ทรงพลัง มีสายสัมพันธ์ลึกลับระดับสากล คอยปกป้องกวินตราในมุมมืด",
    motive: "กวาดล้างกลุ่มทุนทุจริตในวงการ และช่วยกวินตราให้หลุดพ้นจากตระกูลซาตานเพื่อเปิดเผยความจริง",
    imagePlaceholder: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80"
  }
];

export const EPISODE_LOGLINES_60: EpisodeLogline[] = [
  // Arc 1: Ep 1 - 10
  { epNumber: 1, title: "คืนดับสูญบนดาดฟ้า", arcTitle: "Arc 1: กำเนิดใหม่และแผนแทรกซึม", arcNumber: 1, logline: "กวินตราถูกภพธรรมและชู้รักยึดหุ้นบริษัทและผลักตกตึก 50 ชั้นในคืนฝนตกอย่างเลือดเย็น", isClimax: false, intensityScore: 9 },
  { epNumber: 2, title: "ฟื้นจากความตาย", arcTitle: "Arc 1: กำเนิดใหม่และแผนแทรกซึม", arcNumber: 1, logline: "ปาฏิหาริย์ใต้สายฝน! คิริณส่งทีมแพทย์ช่วยชีวิตกวินตราและยื่นข้อเสนอเปลี่ยนตัวตน", isClimax: false, intensityScore: 7 },
  { epNumber: 3, title: "หน้าใหม่ มาดามเอวา", arcTitle: "Arc 1: กำเนิดใหม่และแผนแทรกซึม", arcNumber: 1, logline: "3 ปีของการฝึกฝนสุดเคี่ยว กวินตรากำเนิดใหม่เป็น 'มาดามเอวา' นักลงทุนทรงอิทธิพล", isClimax: false, intensityScore: 7 },
  { epNumber: 4, title: "งานราตรีสายเลือด", arcTitle: "Arc 1: กำเนิดใหม่และแผนแทรกซึม", arcNumber: 1, logline: "เอวาปรากฏตัวในงานราตรีระดมทุนของภพธรรม ทำเอาภพธรรมตกตะลึงเพราะหน้าเหมือนภรรยาที่ตายไป", isClimax: false, intensityScore: 8 },
  { epNumber: 5, title: "คำเชิญลงนรก", arcTitle: "Arc 1: กำเนิดใหม่และแผนแทรกซึม", arcNumber: 1, logline: "เอวายื่นข้อเสนอลงทุน 500 ล้านบาทเพื่อล่อซื้อภพธรรมให้ติดกับดักการเงินสัญญาพิษ", isClimax: false, intensityScore: 7 },
  { epNumber: 6, title: "หมากตัวแรก", arcTitle: "Arc 1: กำเนิดใหม่และแผนแทรกซึม", arcNumber: 1, logline: "เอวาส่งคลิปเสียงลับให้ชู้รักของภพธรรม จนเริ่มเกิดความร้าวฉานในค่ายซาตาน", isClimax: false, intensityScore: 8 },
  { epNumber: 7, title: "ภาพหลอนในความมืด", arcTitle: "Arc 1: กำเนิดใหม่และแผนแทรกซึม", arcNumber: 1, logline: "ภพธรรมเริ่มฝันร้ายและเห็นภาพหลอนของกวินตราจนส่งผลกระทบต่อการเซ็นสัญญาใหญ่", isClimax: false, intensityScore: 8 },
  { epNumber: 8, title: "ข้อเสนอพิษ", arcTitle: "Arc 1: กำเนิดใหม่และแผนแทรกซึม", arcNumber: 1, logline: "ภพธรรมยอมเอาคลังสินค้าหมื่นล้านค้ำประกันเพื่อกู้เงินจากเอวาโดยไม่รู้ว่าเป็นแผนฮุบกิจการ", isClimax: false, intensityScore: 8 },
  { epNumber: 9, title: "กับดักหุ้นเน่า", arcTitle: "Arc 1: กำเนิดใหม่และแผนแทรกซึม", arcNumber: 1, logline: "เอวาปั่นราคาหุ้นบริษัทภพธรรมให้พุ่งสูง แล้วปล่อยข่าวลือเรื่องหนี้เสียกะทันหัน", isClimax: false, intensityScore: 9 },
  { epNumber: 10, title: "วันเปิดตัวประธานคนใหม่", arcTitle: "Arc 1: กำเนิดใหม่และแผนแทรกซึม", arcNumber: 1, logline: "🔥 CLIMAX 1: เอวาถือหุ้นเกิน 51% ก้าวขึ้นด่านสภาบริหารและเปิดเผยตัวตนประธานใหม่ ทำภพธรรมสติแตก!", isClimax: true, intensityScore: 10 },

  // Arc 2: Ep 11 - 20
  { epNumber: 11, title: "เงาในเงารัก", arcTitle: "Arc 2: ปอกลอกคราบมนุษย์", arcNumber: 2, logline: "ภพธรรมพยายามสืบประวัติมาดามเอวา แต่พบเพียงประวัติปลอมระดับชาติที่คิริณสร้างไว้", isClimax: false, intensityScore: 7 },
  { epNumber: 12, title: "พันธมิตรหักหลัง", arcTitle: "Arc 2: ปอกลอกคราบมนุษย์", arcNumber: 2, logline: "เอวาดึงบอร์ดบริหารเก่าที่เคยถูกภพธรรมไล่ออกมาร่วมมือกันแฉสัญญาทาส", isClimax: false, intensityScore: 7 },
  { epNumber: 13, title: "บันทึกลับที่หายไป", arcTitle: "Arc 2: ปอกลอกคราบมนุษย์", arcNumber: 2, logline: "การตามหาไดอารี่บันทึกการคอร์รัปชันที่กวินตราเคยซ่อนไว้ในคฤหาสน์เก่า", isClimax: false, intensityScore: 8 },
  { epNumber: 14, title: "เสียงกระซิบจากหลุมศพ", arcTitle: "Arc 2: ปอกลอกคราบมนุษย์", arcNumber: 2, logline: "ภพธรรมได้รับสายโทรศัพท์ปริศนาใช้เสียงกวินตราเตือนความจำเรื่องคืนดันตึก", isClimax: false, intensityScore: 8 },
  { epNumber: 15, title: "หักหน้ากลางที่ประชุม", arcTitle: "Arc 2: ปอกลอกคราบมนุษย์", arcNumber: 2, logline: "เอวาปฏิเสธโครงการอสังหาฯ ของภพธรรมต่อหน้าผู้ถือหุ้นต่างชาติจนงบขาดสะบั้น", isClimax: false, intensityScore: 8 },
  { epNumber: 16, title: "ละครซ้อนละคร", arcTitle: "Arc 2: ปอกลอกคราบมนุษย์", arcNumber: 2, logline: "ภพธรรมแกล้งทำเป็นสำนึกผิดเพื่อขอคืนดีกับมาดามเอวา แต่ถูกเอวาตบลบทกลับอย่างเจ็บแซ่บ", isClimax: false, intensityScore: 8 },
  { epNumber: 17, title: "ชู้รักแตกคอ", arcTitle: "Arc 2: ปอกลอกคราบมนุษย์", arcNumber: 2, logline: "นรีรัตน์แอบยักยอกเงินบริษัทหนีเพราะระแวงว่าภพธรรมจะหลงเสน่ห์มาดามเอวา", isClimax: false, intensityScore: 9 },
  { epNumber: 18, title: "ยาพิษในถ้วยชา", arcTitle: "Arc 1: ปอกลอกคราบมนุษย์", arcNumber: 2, logline: "ภพธรรมพยายามวางยาวิสัญญีใส่เอวาในมื้ออาหาร แต่เอวาสลับแก้วคืนจนภพธรรมอับอายขายหน้า", isClimax: false, intensityScore: 8 },
  { epNumber: 19, title: "คำเตือนสุดท้าย", arcTitle: "Arc 2: ปอกลอกคราบมนุษย์", arcNumber: 2, logline: "คิริณส่งคำเตือนทางกฎหมายอายัดทรัพย์สินภพธรรมชั่วคราวก่อนงานแถลงข่าวใหญ่", isClimax: false, intensityScore: 9 },
  { epNumber: 20, title: "แฉสัญญาทาสกลางถ่ายทอดสด", arcTitle: "Arc 2: ปอกลอกคราบมนุษย์", arcNumber: 2, logline: "🔥 CLIMAX 2: กลางถ่ายทอดสดทีวี เอวาเปิดคลิปหลักฐานภพธรรมโกงเงินบริจาคโรงพยาบาล จนตร.เข้าอายัด!", isClimax: true, intensityScore: 10 },

  // Arc 3: Ep 21 - 30
  { epNumber: 21, title: "ลายเซ็นต์เลือด", arcTitle: "Arc 3: สงครามจิตวิทยาและปมลับอดีต", arcNumber: 3, logline: "ภพธรรมประกันตัวออกมาด้วยเงินประกันมหาศาลและเริ่มใช้กลุ่มอิทธิพลมืดสู้กลับ", isClimax: false, intensityScore: 8 },
  { epNumber: 22, title: "เมื่อศัตรูเริ่มหวาดระแวง", arcTitle: "Arc 3: สงครามจิตวิทยาและปมลับอดีต", arcNumber: 3, logline: "ภพธรรมสั่งสืบประวัติคิริณจนพบว่าคิริณคือพี่ชายต่างแม่ของกวินตราที่หายสาบสูญ!", isClimax: false, intensityScore: 9 },
  { epNumber: 23, title: "ความลับของคิริณ", arcTitle: "Arc 3: สงครามจิตวิทยาและปมลับอดีต", arcNumber: 3, logline: "เปิดเผยปมในอดีต: คิริณสัญญาว่าจะปกป้องน้องสาวและร่วมมือกับเอวาเพื่อล้างแค้นตระกูลชั่ว", isClimax: false, intensityScore: 8 },
  { epNumber: 24, title: "รอยร้าวในอาณาจักร", arcTitle: "Arc 3: สงครามจิตวิทยาและปมลับอดีต", arcNumber: 3, logline: "บริวารภพธรรมเริ่มทรยศและนำเอกสารเลี่ยงภาษีมาขายให้เอวาเพื่อเอาตัวรอด", isClimax: false, intensityScore: 8 },
  { epNumber: 25, title: "ตะลุยคลังสินค้าลับ", arcTitle: "Arc 3: สงครามจิตวิทยาและปมลับอดีต", arcNumber: 3, logline: "เอวาและคิริณวางแผนแอบเข้าค้นคลังสินค้าและพบวัสดุก่อสร้างตึกไม่ได้มาตรฐานของภพธรรม", isClimax: false, intensityScore: 9 },
  { epNumber: 26, title: "ผู้เห็นเหตุการณ์ลึกลับ", arcTitle: "Arc 3: สงครามจิตวิทยาและปมลับอดีต", arcNumber: 3, logline: "ยามเก่าแก่ผู้เคยเห็นเหตุการณ์ดันตกตึกปรากฏตัวขึ้นพร้อมหลักฐานคลิปกล้องหน้ารถ!", isClimax: false, intensityScore: 9 },
  { epNumber: 27, title: "ซ้อนแผนจับกุม", arcTitle: "Arc 3: สงครามจิตวิทยาและปมลับอดีต", arcNumber: 3, logline: "ภพธรรมส่งมือปืนไปปิดปากยาม แต่เอวาดักซ้อนแผนจับมือปืนได้กลางดึก", isClimax: false, intensityScore: 9 },
  { epNumber: 28, title: "ความจริงเรื่องลูกชาย", arcTitle: "Arc 3: สงครามจิตวิทยาและปมลับอดีต", arcNumber: 3, logline: "นรีรัตน์สารภาพว่าลูกชายที่ภพธรรมเลี้ยง ไม่ใช่ลูกแท้ๆ ของภพธรรม แต่เป็นลูกชู้คนอื่น!", isClimax: false, intensityScore: 9 },
  { epNumber: 29, title: "เหยื่อรายใหม่", arcTitle: "Arc 3: สงครามจิตวิทยาและปมลับอดีต", arcNumber: 3, logline: "ภพธรรมหมดกะจิตกะใจ โดนปอกลอกจนเหลือเพียงบริษัทเปลือกนอก", isClimax: false, intensityScore: 8 },
  { epNumber: 30, title: "การสลับหน้าเผชิญหน้า", arcTitle: "Arc 3: สงครามจิตวิทยาและปมลับอดีต", arcNumber: 3, logline: "🔥 CLIMAX 3: เอวาถอดหน้ากากเมคอัพ เผยรอยแผลเป็นบนหน้าให้ภพธรรมดูในห้องปิดตาย! ภพธรรมช็อกจนแทบบ้า!", isClimax: true, intensityScore: 10 },

  // Arc 4: Ep 31 - 40
  { epNumber: 31, title: "สุนัขจนกรอบ", arcTitle: "Arc 4: การโต้กลับของประธานชั่ว", arcNumber: 4, logline: "ภพธรรมคลั่งจัด วางแผนสั่งฆ่าเอวาดัวยระเบิดรถยนต์เพื่อลบแค้นครั้งสุดท้าย", isClimax: false, intensityScore: 9 },
  { epNumber: 32, title: "แผนสังหารรอบสอง", arcTitle: "Arc 4: การโต้กลับของประธานชั่ว", arcNumber: 4, logline: "รถของเอวาโดนชนประสานงาบนทางด่วน คิริณเสี่ยงชีวิตเอารถเข้าบังเพื่อช่วยเอวา!", isClimax: false, intensityScore: 9 },
  { epNumber: 33, title: "สละชีวิตปกป้อง", arcTitle: "Arc 4: การโต้กลับของประธานชั่ว", arcNumber: 4, logline: "คิริณบาดเจ็บสาหัสเข้า ICU เอวาร้องไห้สวมกอดและสัญญาว่าจะปิดเกมแค้นนี้ให้จบ", isClimax: false, intensityScore: 8 },
  { epNumber: 34, title: "มาดามเอวาตกอับ?", arcTitle: "Arc 4: การโต้กลับของประธานชั่ว", arcNumber: 4, logline: "เอวาปล่อยข่าวแกล้งล้มละลายและบาดเจ็บ เพื่อล่อให้ภพธรรมเผยตัวตนและเงินเก็บก้อนสุดท้ายออกมา", isClimax: false, intensityScore: 8 },
  { epNumber: 35, title: "เสียงหัวเราะผู้ชนะเสแสร้ง", arcTitle: "Arc 4: การโต้กลับของประธานชั่ว", arcNumber: 4, logline: "ภพธรรมจัดงานฉลองชัยชนะปลอมๆ ถอนเงินก้อนสุดท้ายมาลงทุนในโครงการลวงโลกของเอวา", isClimax: false, intensityScore: 8 },
  { epNumber: 36, title: "หักหลังพวกเดียวกัน", arcTitle: "Arc 4: การโต้กลับของประธานชั่ว", arcNumber: 4, logline: "นรีรัตน์แอบเอาเงินก้อนสุดท้ายของภพธรรมไปบ่อน แต่โดนเอวาตลบหลังยึดทรัพย์ทั้งหมด", isClimax: false, intensityScore: 8 },
  { epNumber: 37, title: "เงื่อนไขการไถ่บาป", arcTitle: "Arc 4: การโต้กลับของประธานชั่ว", arcNumber: 4, logline: "นรีรัตน์ยอมกราบเท้าเอวาเพื่อขอให้ไม่ถูกส่งเข้าคุก และยอมเป็นพยานปากเอกคดีฆาตกรรม", isClimax: false, intensityScore: 8 },
  { epNumber: 38, title: "คำขู่จากเงามืด", arcTitle: "Arc 4: การโต้กลับของประธานชั่ว", arcNumber: 4, logline: "ภพธรรมเริ่มโดนเจ้าหนี้นอกระบบไล่ล่าจนต้องระเห็จไปซ่อนตัวตามสลัม", isClimax: false, intensityScore: 8 },
  { epNumber: 39, title: "บดขยี้สายป่านเงินทุน", arcTitle: "Arc 4: การโต้กลับของประธานชั่ว", arcNumber: 4, logline: "เอวาซื้อหนี้ทั้งหมดของภพธรรม กลายเป็นเจ้าหนี้รายเดียวผู้กุมชีวิตเขา", isClimax: false, intensityScore: 9 },
  { epNumber: 40, title: "ล้มละลายในวันเดียว!", arcTitle: "Arc 4: การโต้กลับของประธานชั่ว", arcNumber: 4, logline: "🔥 CLIMAX 4: ศาลสั่งบังคับคดีอายัดคฤหาสน์และทรัพย์สินภพธรรมทั้งหมด กลายเป็นคนสิ้นเนื้อประดาตัว!", isClimax: true, intensityScore: 10 },

  // Arc 5: Ep 41 - 50
  { epNumber: 41, title: "ไร้ที่ซุกหัวนอน", arcTitle: "Arc 5: จุดจบแห่งความโลภ", arcNumber: 5, logline: "ภพธรรมต้องเดินเร่ร่อนข้างถนน ไม่มีเงินซื้อข้าวแม้แต่มื้อเดียว ชดใช้ความโลภในอดีต", isClimax: false, intensityScore: 8 },
  { epNumber: 42, title: "แฉบิลฉ้อโกงข้ามชาติ", arcTitle: "Arc 5: จุดจบแห่งความโลภ", arcNumber: 5, logline: "ตํารวจสากลออกหมายแดงจับกุมภพธรรมในคดีฟอกเงินและฉ้อโกงข้ามชาติ", isClimax: false, intensityScore: 8 },
  { epNumber: 43, title: "รอยแค้นของนรีรัตน์", arcTitle: "Arc 5: จุดจบแห่งความโลภ", arcNumber: 5, logline: "นรีรัตน์โดนจับกุมและยอมรับสารภาพทุกอย่างในศาล พร้อมร้องไห้สำนึกผิดต่อสังคม", isClimax: false, intensityScore: 8 },
  { epNumber: 44, title: "ศาลเตี้ยในเงามืด", arcTitle: "Arc 5: จุดจบแห่งความโลภ", arcNumber: 5, logline: "ภพธรรมพยายามลักลอบหนีออกนอกประเทศทางเรือสินค้าแต่โดนเอวาและตำรวจล้อมปิดประตู", isClimax: false, intensityScore: 9 },
  { epNumber: 45, title: "คำสั่งจับกุมด่วน", arcTitle: "Arc 5: จุดจบแห่งความโลภ", arcNumber: 5, logline: "การวิ่งไล่ล่าสุดระทึกขวัญตามโกดังร้างท่าเรือกลางสายฝน", isClimax: false, intensityScore: 9 },
  { epNumber: 46, title: "หนีตายสะพานลอย", arcTitle: "Arc 5: จุดจบแห่งความโลภ", arcNumber: 5, logline: "ภพธรรมสะดุดล้มกลางสายฝน ร่างกายทรุดโทรม หมดสิ้นคราบประธานสุดหรู", isClimax: false, intensityScore: 8 },
  { epNumber: 47, title: "หลักฐานชิ้นสุดท้าย", arcTitle: "Arc 5: จุดจบแห่งความโลภ", arcNumber: 5, logline: "คลิปวิดีโอเต็มจากดาดฟ้าในคืนผลักตกตึกถูกส่งให้สื่อมวลชนทุกช่องกระจายทั่วประเทศ", isClimax: false, intensityScore: 9 },
  { epNumber: 48, title: "เผชิญหน้าหน้าหลุมศพ", arcTitle: "Arc 5: จุดจบแห่งความโลภ", arcNumber: 5, logline: "ภพธรรมหนีไปที่ป่าหลังวัด พบเอวายืนรออยู่หน้าหลุมศพจำลองของกวินตรา", isClimax: false, intensityScore: 9 },
  { epNumber: 49, title: "สัจธรรมผู้หิวกระหาย", arcTitle: "Arc 5: จุดจบแห่งความโลภ", arcNumber: 5, logline: "เอวาถามภพธรรม: 'เงินที่คุณอยากได้ ยึดไปได้เท่าไหร่ เมื่อต้องแลกด้วยอิสรภาพทั้งชีวิต?'", isClimax: false, intensityScore: 9 },
  { epNumber: 50, title: "ภพธรรมก้มกราบขอชีวิตกลางฝน", arcTitle: "Arc 5: จุดจบแห่งความโลภ", arcNumber: 5, logline: "🔥 CLIMAX 5: ภพธรรมคุกเข่าก้มกราบเอวากลางสายฝนเพื่อขอร้องไม่ให้ส่งตำรวจ แต่เอวาเดินจากไปอย่างนิ่งสงบ!", isClimax: true, intensityScore: 10 },

  // Arc 6: Ep 51 - 60
  { epNumber: 51, title: "การตัดสินใจของเอวา", arcTitle: "Arc 6: บทเรียนคุณธรรมและการพิพากษา", arcNumber: 6, logline: "เอวาเลือกที่จะปล่อยให้กฎหมายทำหน้าที่พิพากษา โดยไม่ลงมือสังหารศัตรูด้วยความแค้นส่วนตัว", isClimax: false, intensityScore: 8 },
  { epNumber: 52, title: "ไม่ขอจองเวรด้วยชีวิต", arcTitle: "Arc 6: บทเรียนคุณธรรมและการพิพากษา", arcNumber: 6, logline: "เอวาสั่งยกเลิกความแค้นในใจ เรียนรู้ว่าการจองเวรไม่ทำให้บาดแผลในอดีตหายไป มีแต่ความดีงามเท่านั้น", isClimax: false, intensityScore: 8 },
  { epNumber: 53, title: "คำพิพากษาของกฎหมาย", arcTitle: "Arc 6: บทเรียนคุณธรรมและการพิพากษา", arcNumber: 6, logline: "ศาลตัดสินจำคุกภพธรรมตลอดชีวิตโดยไม่ลดโทษ ในข้อหาพยายามฆ่า ฉ้อโกง และฟอกเงิน", isClimax: false, intensityScore: 9 },
  { epNumber: 54, title: "เรือนจำแห่งจิตวิญญาณ", arcTitle: "Arc 6: บทเรียนคุณธรรมและการพิพากษา", arcNumber: 6, logline: "ภพธรรมในชุดตรวนก้มหน้าสะอื้นอยู่ในห้องขังไร้แสง เห็นภาพความโลภชั่วชีวิตที่ทำลายตนเอง", isClimax: false, intensityScore: 8 },
  { epNumber: 55, title: "มูลนิธิกวินตรา", arcTitle: "Arc 6: บทเรียนคุณธรรมและการพิพากษา", arcNumber: 6, logline: "เอวานำหุ้นและทรัพย์สินหมื่นล้านทั้งหมดเปลี่ยนเป็น 'มูลนิธิกวินตราเพื่อช่วยเหลือผู้ถูกรังแก'", isClimax: false, intensityScore: 8 },
  { epNumber: 56, title: "คืนแสงสว่างแก่สังคม", arcTitle: "Arc 6: บทเรียนคุณธรรมและการพิพากษา", arcNumber: 6, logline: "โครงการสร้างโรงพยาบาลและศูนย์การเรียนรู้ฟรีเริ่มต้นขึ้น หญิงสาวหลายคนได้รับโอกาสใหม่", isClimax: false, intensityScore: 8 },
  { epNumber: 57, title: "ความจริงใจของคิริณ", arcTitle: "Arc 6: บทเรียนคุณธรรมและการพิพากษา", arcNumber: 6, logline: "คิริณฟื้นตัวเต็มที่ และมอบช่อดอกลิลลี่สีขาวให้เอวา พร้อมสารภาพความรู้สึกที่แท้จริง", isClimax: false, intensityScore: 8 },
  { epNumber: 58, title: "ปลดล็อกพันธนาการหัวใจ", arcTitle: "Arc 6: บทเรียนคุณธรรมและการพิพากษา", arcNumber: 6, logline: "เอวายิ้มอย่างมีความสุขเป็นครั้งแรกในรอบ 3 ปี บาดแผลทางจิตใจได้รับการเยียวยาด้วยความดี", isClimax: false, intensityScore: 8 },
  { epNumber: 59, title: "เริ่มต้นชีวิตใหม่", arcTitle: "Arc 6: บทเรียนคุณธรรมและการพิพากษา", arcNumber: 6, logline: "เอวายอมรับชื่อ 'กวินตรา' กลับคืนมาอย่างภาคภูมิใจ เดินหน้าสู่อนาคตที่อบอุ่นเคียงข้างคิริณ", isClimax: false, intensityScore: 9 },
  { epNumber: 60, title: "บทเรียนคุณธรรมอันยิ่งใหญ่", arcTitle: "Arc 6: บทเรียนคุณธรรมและการพิพากษา", arcNumber: 6, logline: "🔥 GRAND FINALE: ภาพตัดสลับความพังทลายของคนชั่วกับชีวิตใหม่ที่สดใส กวินตราฝากข้อคิดเตือนใจผู้ชมทั่วโลก!", isClimax: true, intensityScore: 10 }
];

export const EPISODE_1_FULL_SCRIPT: EpisodeScript = {
  epNumber: 1,
  title: "คืนดับสูญบนดาดฟ้า (The Roof Betrayal)",
  wordCount: 685,
  estimatedDuration: "5 นาที ( speech duration ~5 mins )",
  hookOpening: "ภพธรรม! มุกยอมมอบทุกอย่างให้คุณ... แม้แต่ชีวิต! แต่ทำไมคุณถึงผลักมุกตกตึกเพื่อไปอยู่กับชู้!",
  scenes: [
    {
      sceneNumber: 1,
      location: "ดาดฟ้าตึกสำนักงานใหญ่ ชั้น 50",
      timeOfDay: "กลางคืน (ฝนตกหนัก พายุพัดแรง)",
      visual: "มุมกล้องกว้าง (Wide Shot) เห็นเงาร่างสองร่างยืนอยู่ท่ามกลางสายฝน ละอองน้ำกระเซ็น แสงไฟนีออนจากเมืองหลวงเบลอเป็นโบเก้ด้านหลัง กล้องซูมด่วน (Fast Zoom) เข้าที่ใบหน้าของกวินตราที่เปียกปอน น้ำตาปนสายฝน",
      cameraDirection: "Low-angle dynamic tracking shot, dramatic high-contrast lighting, rain droplets flying in slow motion.",
      dialogue: [
        {
          character: "กวินตรา",
          action: "ตะโกนแข่งกับเสียงพายุ น้ำตาไหลริน มือสองข้างกุมเอกสารสัญญายึดทรัพย์ที่เปียกปอน",
          text: "ภพธรรม! มุกยอมมอบทุกอย่างให้คุณ... ทั้งงานวิจัย ทั้งหุ้นบริษัท แม้แต่ชีวิตมุกก็ให้คุณได้! แต่ทำไม... ทำไมคุณถึงทำแบบนี้กับมุก!"
        },
        {
          character: "ภพธรรม",
          action: "ยิ้มมุมปากอย่างเลือดเย็น ถือร่มสีดำสนิท ก้าวเข้ามาหาช้าๆ น้ำเสียงเต็มไปด้วยความเหยียดหยาม",
          text: "มุก... คุณมันซื่อบื้อเอง! ในโลกธุรกิจที่โสมมแบบนี้ คนใจบุญอย่างคุณมันก็เป็นแค่เหยื่อ! เงินหมื่นล้านกับตำแหน่งประธานบริษัท... มันต้องอยู่กับคนที่คู่ควรอย่างผมกับนรีรัตน์ต่างหาก!"
        },
        {
          character: "นรีรัตน์",
          action: "ก้าวออกมาจากเงามืด สวมชุดเดรสสีแดงหรูหรา ถือแก้วไวน์ ยิ้มเยาะกวินตรา",
          text: "กวินตราจอมปลอม... แกคิดจริงเหรอว่าภพธรรมเขารักแก? ที่ผ่านมาเขาแค่หลอกใช้สมองกับเงินตระกูลแกต่างหากล่ะ! ตอนนี้เซ็นสัญญาเรียบร้อยแล้ว... แกหมดประโยชน์แล้ว!"
        },
        {
          character: "กวินตรา",
          action: "ถอยหลังจนส้นรองเท้าชนกับขอบกั้นดาดฟ้า มองลึกลงไปเห็นความสูง 50 ชั้น",
          text: "พวกคุณมันซาตานในคราบคน! กฎหมายและฟ้าดินจะต้องลงโทษพวกแก!"
        },
        {
          character: "ภพธรรม",
          action: "หัวเราะในคออย่างบ้าคลั่ง หุบร่มลง แล้วใช้มือพุ่งกระชากอกเสื้อกวินตราอย่างแรง",
          text: "ฟ้าดินเหรอ? ในเมืองนี้... เงินของผมคือฟ้าดิน! ลาก่อนนะ... เมียแสนดี!"
        }
      ],
      midjourneyPrompt: "Dramatic cinematic film still, night rainy skyscraper rooftop 50 floors high, neon city lights bokeh in background, a villain man in navy suit pushing a woman in ruined white dress over the edge, extreme close-up on terrified woman eyes reflecting neon rain, high contrast, movie scene, 8k resolution, Arri Alexa lighting --ar 9:16 --style raw",
      klingVideoPrompt: "Camera slow zoom into woman's crying face on rainy skyscraper edge, villain pushes her, dramatic rain motion, ultra cinematic 4k video"
    },
    {
      sceneNumber: 2,
      location: "หอผู้ป่วย ICU ลึกลับ ต่างประเทศ",
      timeOfDay: "กลางคืน (บรรยากาศเงียบสงัด เสียงชีพจรเต้น)",
      visual: "มุมกล้องระดับสายตา (Eye level shot) มองผ่านกระจกนิรภัยเข้าไปในห้อง ICU ร่างกวินตราถูกพันผ้าพันแผลมี่หน้าและลำตัว มีเครื่องช่วยหายใจ เงาร่างสูงใหญ่ของ 'คิริณ' ยืนจ้องมองจากด้านนอก",
      cameraDirection: "Slow horizontal pan, atmospheric dark luxury hospital setting, cyan and warm yellow dual lighting.",
      dialogue: [
        {
          character: "คิริณ",
          action: "ยืนเอามือซุกกระเป๋ากางเกง สายตาเรียบนิ่งภายใต้แว่นตากรอบบาง พูดกับหมอศัลยกรรมข้างกาย",
          text: "เปลี่ยนหน้าเธอซะ... ใช้เทคโนโลยีการแพทย์ที่ดีที่สุดในโลก ทำให้เธอฟื้นขึ้นมาในฐานะคนใหม่ที่ไม่มีใครรู้จัก"
        },
        {
          character: "หมอศัลยกรรม",
          action: "ก้มศีรษะรับคำสั่งอย่างนอบน้อม",
          text: "รับทราบครับท่านคิริณ... แล้วความทรงจำของเธอล่ะครับ?"
        },
        {
          character: "คิริณ",
          action: "มองแผลเป็นรูปหยดน้ำตาใกล้ขมับของกวินตราผ่านกระจก",
          text: "ปล่อยให้ความแค้นเตือนสติเธอไว้... เพราะต่อจากนี้ เธอไม่ได้ชื่อกวินตราอีกต่อไป แต่เธอคือ 'มาดามเอวา' หมากลูกสำคัญที่จะล้มอาณาจักรซาตาน!"
        }
      ],
      midjourneyPrompt: "Cinematic shot of high-tech ICU room, mysterious billionaire man with wire-rimmed glasses looking at a patient covered in bandages through glass, moody cyan and teal lighting, dramatic shadow, photorealistic 8k --ar 9:16",
      klingVideoPrompt: "Slow pan from medical monitor to Kirin's sharp face looking through glass, dark cinematic atmosphere"
    },
    {
      sceneNumber: 3,
      location: "หน้างานราตรีระดมทุนอสังหาริมทรัพย์ระดับชาติ",
      timeOfDay: "กลางคืน (ไฟสปอตไลท์ระยิบระยับ พรมแดง)",
      visual: "มุมกล้องต่ำ (Low-angle tracking shot) ล้อรถ Maybach สีดำเงาวับจอดนิ่ง ประตูกระจกเปิดออก ขาสวยในรองเท้าส้นสูงสีแดงสการ์เล็ตแตะพรมแดง ชายกระโปรงสูทสีแดงเข้มพริ้วไหว ผู้คนและนักข่าวหันมองเป็นตาเดียว",
      cameraDirection: "Low angle tracking follow-shot, smooth gimbal motion, camera flashbulbs flashing dramatically.",
      dialogue: [
        {
          character: "นักข่าว 1",
          action: "รุมล้อมถ่ายรูปส่งเสียงฮือฮา",
          text: "นั่นไง! มาดามเอวา ประธานกลุ่มทุนยักษ์ใหญ่จากยุโรปเดินทางมาถึงแล้ว!"
        },
        {
          character: "ภพธรรม",
          action: "ควงแขนนรีรัตน์เดินออกมาต้อนรับด้วยรอยยิ้มประธานใหญ่ แต่เมื่อเห็นหน้ามาดามเอวา ช้อนตาขึ้นมอง... แก้วไวน์ในมือภพธรรมหลุดมือตกแตกกระจาย!",
          text: "มุ... กวินตรา?! เป็นไปไม่ได้! แกตายไปแล้วเมื่อ 3 ปีก่อน!"
        },
        {
          character: "มาดามเอวา",
          action: "ถอดแว่นกันแดดสีดำออก ยิ้มสง่างามแต่สายตาเย็นเยียบดุจน้ำแข็ง ก้าวเข้าไปหาภพธรรมช้าๆ",
          text: "กวินตราเหรอคะ? ดิฉันชื่อ 'เอวา' ค่ะคุณภพธรรม... แต่ยินดีที่ได้รู้จักนะคะ ประธานผู้ทรงอิทธิพล... ที่สร้างอาณาจักรบนกองเลือดและน้ำตาคนอื่น!"
        }
      ],
      midjourneyPrompt: "Cinematic low angle shot, powerful beautiful woman in crimson suit jacket stepping out of black Maybach onto red carpet, flashbulbs, dramatic high contrast, photorealistic 8k, Arri Alexa lighting --ar 9:16",
      klingVideoPrompt: "Camera follows red high heels stepping onto red carpet, woman removes sunglasses, villain drops wine glass in shock, epic slow motion"
    }
  ],
  moralLesson: "บทเรียนคุณธรรมประจำตอน: 'คนที่สร้างอาณาจักรบนความเจ็บปวดของผู้อื่น อาจเสแสร้งหัวเราะได้ในวันนี้... แต่เมื่อความจริงปรากฏ แม้แต่เงามืดก็ไม่ละเว้นคนชั่ว!'"
};

export interface WorkflowStep {
  step: number;
  title: string;
  tool: string;
  toolCategory: string;
  description: string;
  technique: string;
  action: string;
  examplePrompt?: string;
}

export const AUTOMATION_WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: "1. เขียนบทและโครงเรื่อง (Scripting & Storyboard)",
    tool: "Gemini",
    toolCategory: "AI สายพัฒนาข้อความ (LLM)",
    description: "ใช้ AI สายพัฒนาข้อความเพื่อคิดพล็อตเรื่อง สร้างบทพูด และวางแผนฉาก แนวสยองขวัญหักมุมหรือดราม่าล้างแค้น พร้อมแบ่งเนื้อหาออกเป็นฉาก ๆ (Scene by Scene)",
    technique: "กำหนด Hook 5 วินาทีแรก, แบ่งฉาก Location/Time/Camera Direction, เขียนบทพูด High Conflict และระบุคำสั่งสร้างสื่อของทุกฉาก",
    action: "ได้สคริปต์บทละครฉบับเต็ม + Storyboard แบ่งฉากพร้อมสำหรับการโปรดักชัน",
    examplePrompt: "เขียนบทหนังสั้นแนวสยองขวัญหักมุม ความยาว 5 นาที แบ่งฉาก Scene by Scene พร้อมระบุคำสั่งมุมกล้องและบทสนทนา..."
  },
  {
    step: 2,
    title: "2. ออกแบบตัวละครและฉากภาพนิ่ง (Image Generation)",
    tool: "Midjourney",
    toolCategory: "AI เจนภาพนิ่งความละเอียดสูง",
    description: "สร้างภาพต้นแบบของตัวละครและฉากหลัง เพื่อนำไปทำเป็นวิดีโอในขั้นตอนต่อไป โดยใช้คีย์เวิร์ด (Prompt) อธิบายลักษณะตัวละคร ทรงผม เสื้อผ้า และบรรยากาศของฉาก",
    technique: "เทคนิคสำคัญ: ให้ใส่โค้ดหรือชื่อตัวละครเดิมซ้ำ ๆ (--cref หรือ Character Seed) เพื่อล็อกใบหน้าตัวละครให้เหมือนกันทุกฉาก",
    action: "ได้ไฟล์ภาพนิ่งตัวละครและฉากหลังขนาด 9:16 ความละเอียดสูง 8K",
    examplePrompt: "Cinematic film still of 29yo Asian woman in crimson suit, sharp confident eyes, rain reflections --ar 9:16 --style raw --cref [character_id]"
  },
  {
    step: 3,
    title: "3. แปลงภาพนิ่งให้เคลื่อนไหว (Text/Image to Video)",
    tool: "Runway (Gen-2 / Gen-3)",
    toolCategory: "AI แปลงภาพนิ่งเป็นวิดีโอ (Image-to-Video)",
    description: "เปลี่ยนภาพนิ่งจากขั้นตอนที่แล้ว หรือใช้ข้อความบรรยายคำสั่งโดยตรง เพื่อสร้างเป็นคลิปวิดีโอสั้น โดยนำภาพนิ่งมาอัปโหลด แล้วสั่งให้ AI ขยับมุมกล้อง หรือขยับตัวละคร (ความยาวมักจะอยู่ที่ 4-10 วินาทีต่อคลิป)",
    technique: "ใช้คำสั่งกล้อง เช่น Slow push-in, pan right, rain motion, subtle face emotional movement 4-10 วินาที",
    action: "ได้คลิปวิดีโอสั้น HD 4-10 วินาทีต่อช็อตที่มีการเคลื่อนไหวสมจริง",
    examplePrompt: "Slow camera zoom into Asian female CEO with rain effect and subtle emotional expression, cinematic 4k"
  },
  {
    step: 4,
    title: "4. สร้างเสียงพากย์และบทบรรยาย (AI Voice Generator)",
    tool: "ElevenLabs",
    toolCategory: "AI สังเคราะห์เสียงพากย์ที่มีอารมณ์ร่วม",
    description: "แปลงข้อความบทพูดจากขั้นตอนแรกให้เป็นเสียงพากย์ที่มีอารมณ์ร่วมเหมือนมนุษย์ โดยการคัดลอกบทพูดลงไปในโปรแกรม เลือกสไตล์เสียง (ชาย/หญิง) และโทนเสียงตามอารมณ์ของฉาก",
    technique: "ปรับเลือก Voice Model ภาษาไทย/อังกฤษ เลือกโทนเสียงสุขุม ดราม่า หรือสะพรึงกลัว พร้อมปรับค่า Stability และ Clarity ให้ตรงกับอารมณ์ฉาก",
    action: "ได้ไฟล์เสียงพากย์ MP3/WAV คุณภาพสตูดิโอที่แยกเสียงตามตัวละคร",
    examplePrompt: "Character: Madame Eva | Tone: Calm, Revengeful, Deep | Voice: Eleanor / Adam (Eleven Multilingual v2)"
  },
  {
    step: 5,
    title: "5. สร้างเพลงประกอบและเอฟเฟกต์เสียง (AI Music & Sound Effects)",
    tool: "Suno",
    toolCategory: "AI แต่งเพลงและสร้าง Sound Design",
    description: "เพิ่มความน่าติดตามและความเป็นมืออาชีพให้กับหนังสั้นด้วยดนตรีประกอบที่สร้างขึ้นใหม่โดยไม่ติดลิขสิทธิ์ โดยใช้แนวเพลงตื่นเต้นแนว Cinematic เพื่อให้ AI เจนเพลงยาวตามต้องการ",
    technique: "ระบุ Style of Music เช่น 'Cinematic Horror Suspense, Orchestral Tension, Dark Revenge' กำหนดความยาวเพลงตามต้องการ",
    action: "ได้เพลง BGM และ Sound Effect ไร้ลิขสิทธิ์ระดับพรีเมียม",
    examplePrompt: "Cinematic dark suspense horror theme, heavy orchestral brass, intense crescendo, revenge drama soundtrack"
  },
  {
    step: 6,
    title: "6. ตัดต่อและรวมไฟล์ (Video Editing & Compositing)",
    tool: "CapCut",
    toolCategory: "โปรแกรมตัดต่อและรวมไฟล์มัลติมีเดีย",
    description: "นำคลิปวิดีโอ เสียงพากย์ และเพลงประกอบทั้งหมดมาวางบนไทม์ไลน์เพื่อร้อยเรียงเป็นหนังสั้นที่สมบูรณ์ ตัดต่อไล่เรียงตามบท ใส่เอฟเฟกต์เปลี่ยนฉาก (Transition) และเพิ่มคำบรรยาย (Subtitle)",
    technique: "วาง Video Clips เรียงตาม Storyboard + ซิงค์เสียงพากย์ ElevenLabs + วาง BGM Suno ลดเสียงลง -15dB + เปิด Auto Subtitles ภาษาไทยแบบเน้นคำสำคัญ",
    action: "ได้คลิปหนังสั้น 5 นาทีฉบับสมบูรณ์ พร้อมส่งออกเพื่อโพสต์บน TikTok, Shorts, Reels!",
    examplePrompt: "CapCut Timeline Setup: Layer 1 (Video Clips) + Layer 2 (ElevenLabs VO) + Layer 3 (Suno BGM) + Auto Captions (Kanit Font)"
  }
];
