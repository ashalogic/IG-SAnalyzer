import React from "react";
import ReactWordcloud from "react-wordcloud";
import { Line, Bar, Pie } from "react-chartjs-2";

import "./App.css";

import NavBar from "./Cards/NavBar";
import TitleCard from "./Cards/TitleCard";
// import ProfileCard from "./Cards/ProfileCard";
import ProfileCardGlass from "./Cards/ProfileCardGlass";
import FeatureCard from "./Cards/FeatureCard";

import { ResponsiveCalendarCanvas } from "@nivo/calendar";
import ProfileCardv2 from "./Cards/ProfileCardv2";
import Feature from "./Cards/Feature";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: "rambodjavan1"
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  fetchData(event) {
    fetch("https://www.instagram.com/" + this.state.username + "/?__a=1")
      .then(response => response.json())
      .then(responseJson => {
        var stopwords = [
          "!",
          "#",
          "(",
          ")",
          "*",
          ",",
          "-",
          ".",
          "/",
          ":",
          "[",
          "]",
          "«",
          "»",
          "،",
          "؛",
          "؟",
          "آباد",
          "آخ",
          "آخر",
          "آخرها",
          "آخه",
          "آدمهاست",
          "آرام",
          "آرام آرام",
          "آره",
          "آری",
          "آزادانه",
          "آسان",
          "آسیب پذیرند",
          "آشنایند",
          "آشکارا",
          "آقا",
          "آقای",
          "آقایان",
          "آمد",
          "آمدن",
          "آمده",
          "آمرانه",
          "آن",
          "آن گاه",
          "آنان",
          "آنانی",
          "آنجا",
          "آنرا",
          "آنطور",
          "آنقدر",
          "آنها",
          "آنهاست",
          "آنچنان",
          "آنچنان که",
          "آنچه",
          "آنکه",
          "آنگاه",
          "آن‌ها",
          "آهان",
          "آهای",
          "آور",
          "آورد",
          "آوردن",
          "آورده",
          "آوه",
          "آی",
          "آیا",
          "آید",
          "آیند",
          "ا",
          "اتفاقا",
          "اثرِ",
          "اجراست",
          "احتراما",
          "احتمالا",
          "احیاناً",
          "اخیر",
          "اخیراً",
          "اری",
          "از",
          "از آن پس",
          "از جمله",
          "ازاین رو",
          "ازجمله",
          "ازش",
          "اساسا",
          "اساساً",
          "است",
          "استفاد",
          "استفاده",
          "اسلامی اند",
          "اش",
          "اشتباها",
          "اشکارا",
          "اصلا",
          "اصلاً",
          "اصولا",
          "اصولاً",
          "اعلام",
          "اغلب",
          "افزود",
          "افسوس",
          "اقل",
          "اقلیت",
          "الا",
          "الان",
          "البته",
          "البتّه",
          "الهی",
          "الی",
          "ام",
          "اما",
          "امروز",
          "امروزه",
          "امسال",
          "امشب",
          "امور",
          "امیدوارم",
          "امیدوارند",
          "امیدواریم",
          "ان",
          "ان شاأالله",
          "انتها",
          "انجام",
          "اند",
          "اندکی",
          "انشاالله",
          "انصافا",
          "انطور",
          "انقدر",
          "انها",
          "انچنان",
          "انکه",
          "انگار",
          "او",
          "اوست",
          "اول",
          "اولا",
          "اولاً",
          "اولین",
          "اون",
          "اکثر",
          "اکثرا",
          "اکثراً",
          "اکثریت",
          "اکنون",
          "اگر",
          "اگر چه",
          "اگرچه",
          "اگه",
          "ای",
          "ایا",
          "اید",
          "ایشان",
          "ایم",
          "این",
          "این جوری",
          "این قدر",
          "این گونه",
          "اینان",
          "اینجا",
          "اینجاست",
          "ایند",
          "اینطور",
          "اینقدر",
          "اینها",
          "اینهاست",
          "اینو",
          "اینچنین",
          "اینک",
          "اینکه",
          "اینگونه",
          "ب",
          "با",
          "بااین حال",
          "بااین وجود",
          "باد",
          "بار",
          "بارة",
          "باره",
          "بارها",
          "باز",
          "باز هم",
          "بازهم",
          "بازی کنان",
          "بازیگوشانه",
          "باش",
          "باشد",
          "باشم",
          "باشند",
          "باشی",
          "باشید",
          "باشیم",
          "بالا",
          "بالاخره",
          "بالاخص",
          "بالاست",
          "بالای",
          "بالایِ",
          "بالطبع",
          "بالعکس",
          "باوجودی که",
          "باورند",
          "باید",
          "بتدریج",
          "بتوان",
          "بتواند",
          "بتوانی",
          "بتوانیم",
          "بجز",
          "بخش",
          "بخشه",
          "بخشی",
          "بخصوص",
          "بخواه",
          "بخواهد",
          "بخواهم",
          "بخواهند",
          "بخواهی",
          "بخواهید",
          "بخواهیم",
          "بخوبی",
          "بد",
          "بدان",
          "بدانجا",
          "بدانها",
          "بدهید",
          "بدون",
          "بدین",
          "بدین ترتیب",
          "بدینجا",
          "بر",
          "برآنند",
          "برا",
          "برابر",
          "برابرِ",
          "براحتی",
          "براساس",
          "براستی",
          "برای",
          "برایت",
          "برایش",
          "برایشان",
          "برایم",
          "برایمان",
          "برایِ",
          "برخوردار",
          "برخوردارند",
          "برخی",
          "برداری",
          "برعکس",
          "برنامه سازهاست",
          "بروز",
          "بروشنی",
          "بزرگ",
          "بزودی",
          "بس",
          "بسا",
          "بسادگی",
          "بسختی",
          "بسوی",
          "بسی",
          "بسیار",
          "بسیاری",
          "بشدت",
          "بطور",
          "بطوری که",
          "بعد",
          "بعد از این که",
          "بعدا",
          "بعدازظهر",
          "بعداً",
          "بعدها",
          "بعری",
          "بعضا",
          "بعضی",
          "بعضی شان",
          "بعضیهایشان",
          "بعضی‌ها",
          "بعلاوه",
          "بعید",
          "بفهمی نفهمی",
          "بلافاصله",
          "بله",
          "بلکه",
          "بلی",
          "بماند",
          "بنابراین",
          "بندی",
          "به",
          "به آسانی",
          "به تازگی",
          "به تدریج",
          "به تمامی",
          "به جای",
          "به جز",
          "به خوبی",
          "به درشتی",
          "به دلخواه",
          "به راستی",
          "به رغم",
          "به روشنی",
          "به زودی",
          "به سادگی",
          "به سرعت",
          "به شان",
          "به شدت",
          "به طور کلی",
          "به طوری که",
          "به علاوه",
          "به قدری",
          "به مراتب",
          "به ناچار",
          "به هرحال",
          "به هیچ وجه",
          "به وضوح",
          "به ویژه",
          "به کرات",
          "به گرمی",
          "بهت",
          "بهتر",
          "بهترین",
          "بهش",
          "بود",
          "بودم",
          "بودن",
          "بودند",
          "بوده",
          "بودی",
          "بودید",
          "بودیم",
          "بویژه",
          "بپا",
          "بکار",
          "بکن",
          "بکند",
          "بکنم",
          "بکنند",
          "بکنی",
          "بکنید",
          "بکنیم",
          "بگذاریم",
          "بگو",
          "بگوید",
          "بگویم",
          "بگویند",
          "بگویی",
          "بگویید",
          "بگوییم",
          "بگیر",
          "بگیرد",
          "بگیرم",
          "بگیرند",
          "بگیری",
          "بگیرید",
          "بگیریم",
          "بی",
          "بی آنکه",
          "بی اطلاعند",
          "بی تردید",
          "بی تفاوتند",
          "بی نیازمندانه",
          "بی هدف",
          "بیا",
          "بیاب",
          "بیابد",
          "بیابم",
          "بیابند",
          "بیابی",
          "بیابید",
          "بیابیم",
          "بیاور",
          "بیاورد",
          "بیاورم",
          "بیاورند",
          "بیاوری",
          "بیاورید",
          "بیاوریم",
          "بیاید",
          "بیایم",
          "بیایند",
          "بیایی",
          "بیایید",
          "بیاییم",
          "بیرون",
          "بیرونِ",
          "بیست",
          "بیش",
          "بیشتر",
          "بیشتری",
          "بین",
          "بیگمان",
          "ت",
          "تا",
          "تازه",
          "تان",
          "تاکنون",
          "تحت",
          "تحریم هاست",
          "تر",
          "تر براساس",
          "تریلیارد",
          "تریلیون",
          "ترین",
          "تصریحاً",
          "تعدادی",
          "تعمدا",
          "تقریبا",
          "تقریباً",
          "تلویحا",
          "تلویحاً",
          "تمام",
          "تمام قد",
          "تماما",
          "تمامشان",
          "تمامی",
          "تند تند",
          "تنها",
          "تو",
          "توؤماً",
          "توان",
          "تواند",
          "توانست",
          "توانستم",
          "توانستن",
          "توانستند",
          "توانسته",
          "توانستی",
          "توانستیم",
          "توانم",
          "توانند",
          "توانی",
          "توانید",
          "توانیم",
          "توسط",
          "تولِ",
          "توی",
          "تویِ",
          "تک تک",
          "ث",
          "ثالثاً",
          "ثانیا",
          "ثانیاً",
          "ج",
          "جا",
          "جای",
          "جایی",
          "جدا",
          "جداً",
          "جداگانه",
          "جدید",
          "جدیدا",
          "جرمزاست",
          "جریان",
          "جز",
          "جلو",
          "جلوگیری",
          "جلوی",
          "جلویِ",
          "جمع اند",
          "جمعا",
          "جمعی",
          "جنابعالی",
          "جناح",
          "جنس اند",
          "جهت",
          "جور",
          "ح",
          "حاشیه‌ای",
          "حاضر",
          "حاضرم",
          "حال",
          "حالا",
          "حاکیست",
          "حتما",
          "حتماً",
          "حتی",
          "حداقل",
          "حداکثر",
          "حدود",
          "حدودا",
          "حدودِ",
          "حسابگرانه",
          "حضرتعالی",
          "حق",
          "حقیرانه",
          "حقیقتا",
          "حول",
          "حکماً",
          "خ",
          "خارجِ",
          "خالصانه",
          "خب",
          "خداحافظ",
          "خداست",
          "خدمات",
          "خسته‌ای",
          "خصوصا",
          "خصوصاً",
          "خلاصه",
          "خواست",
          "خواستم",
          "خواستن",
          "خواستند",
          "خواسته",
          "خواستی",
          "خواستید",
          "خواستیم",
          "خواه",
          "خواهد",
          "خواهم",
          "خواهند",
          "خواهی",
          "خواهید",
          "خواهیم",
          "خوب",
          "خود",
          "خود به خود",
          "خودبه خودی",
          "خودت",
          "خودتان",
          "خودتو",
          "خودش",
          "خودشان",
          "خودم",
          "خودمان",
          "خودمو",
          "خوش",
          "خوشبختانه",
          "خویش",
          "خویشتن",
          "خویشتنم",
          "خیاه",
          "خیر",
          "خیره",
          "خیلی",
          "د",
          "دا",
          "داام",
          "دااما",
          "داخل",
          "داد",
          "دادم",
          "دادن",
          "دادند",
          "داده",
          "دادی",
          "دادید",
          "دادیم",
          "دار",
          "داراست",
          "دارد",
          "دارم",
          "دارند",
          "داری",
          "دارید",
          "داریم",
          "داشت",
          "داشتم",
          "داشتن",
          "داشتند",
          "داشته",
          "داشتی",
          "داشتید",
          "داشتیم",
          "دامم",
          "دانست",
          "دانند",
          "دایم",
          "دایما",
          "در",
          "در باره",
          "در بارهٌ",
          "در ثانی",
          "در مجموع",
          "در نهایت",
          "در واقع",
          "در کل",
          "در کنار",
          "دراین میان",
          "درباره",
          "درحالی که",
          "درحالیکه",
          "درست",
          "درست و حسابی",
          "درسته",
          "درصورتی که",
          "درعین حال",
          "درمجموع",
          "درواقع",
          "درون",
          "دریغ",
          "دریغا",
          "درین",
          "دسته دسته",
          "دشمنیم",
          "دقیقا",
          "دم",
          "دنبالِ",
          "ده",
          "دهد",
          "دهم",
          "دهند",
          "دهی",
          "دهید",
          "دهیم",
          "دو",
          "دو روزه",
          "دوباره",
          "دوم",
          "دیده",
          "دیر",
          "دیرت",
          "دیرم",
          "دیروز",
          "دیشب",
          "دیوانه‌ای",
          "دیوی",
          "دیگر",
          "دیگران",
          "دیگری",
          "دیگه",
          "ذ",
          "ذاتاً",
          "ر",
          "را",
          "راجع به",
          "راحت",
          "راسا",
          "راست",
          "راستی",
          "راه",
          "رسما",
          "رسید",
          "رسیده",
          "رشته",
          "رفت",
          "رفتارهاست",
          "رفته",
          "رنجند",
          "رهگشاست",
          "رو",
          "رواست",
          "روب",
          "روبروست",
          "روز",
          "روز به روز",
          "روزانه",
          "روزه ایم",
          "روزه ست",
          "روزه م",
          "روزهای",
          "روزه‌ای",
          "روش",
          "روی",
          "رویش",
          "رویِ",
          "ریزی",
          "ز",
          "زشتکارانند",
          "زمان",
          "زمانی",
          "زمینه",
          "زنند",
          "زهی",
          "زود",
          "زودتر",
          "زیاد",
          "زیاده",
          "زیر",
          "زیرا",
          "زیرِ",
          "زیرچشمی",
          "س",
          "سابق",
          "ساخته",
          "ساده اند",
          "سازی",
          "سالانه",
          "سالته",
          "سالم‌تر",
          "سالهاست",
          "سالیانه",
          "ساکنند",
          "سایر",
          "سخت",
          "سخته",
          "سر",
          "سراسر",
          "سرانجام",
          "سراپا",
          "سری",
          "سریع",
          "سریعا",
          "سریعاً",
          "سریِ",
          "سعی",
          "سمتِ",
          "سه باره",
          "سهواً",
          "سوم",
          "سوی",
          "سویِ",
          "سپس",
          "سیاه چاله هاست",
          "سیخ",
          "ش",
          "شان",
          "شاهدند",
          "شاهدیم",
          "شاید",
          "شبهاست",
          "شخصا",
          "شخصاً",
          "شد",
          "شدم",
          "شدن",
          "شدند",
          "شده",
          "شدی",
          "شدید",
          "شدیدا",
          "شدیداً",
          "شدیم",
          "شش",
          "شش نداشته",
          "شما",
          "شماری",
          "شماست",
          "شمایند",
          "شناسی",
          "شو",
          "شود",
          "شوراست",
          "شوقم",
          "شوم",
          "شوند",
          "شونده",
          "شوی",
          "شوید",
          "شویم",
          "شیرین",
          "شیرینه",
          "شیک",
          "ص",
          "صد",
          "صددرصد",
          "صرفا",
          "صرفاً",
          "صریحاً",
          "صندوق هاست",
          "صورت",
          "ض",
          "ضدِّ",
          "ضدِّ",
          "ضمن",
          "ضمناً",
          "ط",
          "طبعا",
          "طبعاً",
          "طبقِ",
          "طبیعتا",
          "طرف",
          "طریق",
          "طلبکارانه",
          "طور",
          "طی",
          "ظ",
          "ظاهرا",
          "ظاهراً",
          "ع",
          "عاجزانه",
          "عاقبت",
          "عبارتند",
          "عجب",
          "عجولانه",
          "عدم",
          "عرفانی",
          "عقب",
          "عقبِ",
          "علاوه بر",
          "علاوه بر آن",
          "علاوه برآن",
          "علناً",
          "علّتِ",
          "علی الظاهر",
          "علی رغم",
          "علیرغم",
          "علیه",
          "عمدا",
          "عمداً",
          "عمدتا",
          "عمدتاً",
          "عمده",
          "عمل",
          "عملا",
          "عملاً",
          "عملی اند",
          "عموم",
          "عموما",
          "عموماً",
          "عنقریب",
          "عنوان",
          "عنوانِ",
          "عیناً",
          "غ",
          "غالبا",
          "غزالان",
          "غیر",
          "غیرقانونی",
          "ف",
          "فاقد",
          "فبها",
          "فر",
          "فردا",
          "فعلا",
          "فعلاً",
          "فقط",
          "فلان",
          "فلذا",
          "فوق",
          "فکر",
          "ق",
          "قاالند",
          "قابل",
          "قاطبه",
          "قاطعانه",
          "قاعدتاً",
          "قانوناً",
          "قبل",
          "قبلا",
          "قبلاً",
          "قبلند",
          "قدر",
          "قدری",
          "قصدِ",
          "قضایاست",
          "قطعا",
          "قطعاً",
          "ل",
          "لااقل",
          "لاجرم",
          "لب",
          "لذا",
          "لزوماً",
          "لطفا",
          "لطفاً",
          "لیکن",
          "م",
          "ما",
          "مادامی",
          "ماست",
          "مامان مامان گویان",
          "مان",
          "مانند",
          "مانندِ",
          "مبادا",
          "متؤسفانه",
          "متاسفانه",
          "متعاقبا",
          "متفاوتند",
          "مثل",
          "مثلا",
          "مثلِ",
          "مجانی",
          "مجبورند",
          "مجددا",
          "مجدداً",
          "مجموعا",
          "مجموعاً",
          "محتاجند",
          "محکم",
          "محکم‌تر",
          "مخالفند",
          "مختلف",
          "مخصوصاً",
          "مدام",
          "مدت",
          "مدتهاست",
          "مدّتی",
          "مذهبی اند",
          "مرا",
          "مرتب",
          "مردانه",
          "مردم",
          "مردم اند",
          "مرسی",
          "مستحضرید",
          "مستقیما",
          "مستند",
          "مسلما",
          "مشت",
          "مشترکاً",
          "مشغولند",
          "مطمانا",
          "مطمانم",
          "مطمینا",
          "مع الاسف",
          "مع ذلک",
          "معتقدم",
          "معتقدند",
          "معتقدیم",
          "معدود",
          "معذوریم",
          "معلومه",
          "معمولا",
          "معمولاً",
          "معمولی",
          "مغرضانه",
          "مفیدند",
          "مقابل",
          "مقدار",
          "مقصرند",
          "مقصری",
          "ملیارد",
          "ملیون",
          "ممکن",
          "ممیزیهاست",
          "من",
          "منتهی",
          "منطقی",
          "منی",
          "مواجهند",
          "موارد",
          "موجودند",
          "مورد",
          "موقتا",
          "مکرر",
          "مکرراً",
          "مگر",
          "مگر آن که",
          "مگر این که",
          "مگو",
          "می",
          "میان",
          "میزان",
          "میلیارد",
          "میلیون",
          "میکند",
          "میکنم",
          "میکنند",
          "میکنی",
          "میکنید",
          "میکنیم",
          "می‌تواند",
          "می‌خواهیم",
          "می‌داند",
          "می‌رسد",
          "می‌رود",
          "می‌شود",
          "می‌کنم",
          "می‌کنند",
          "می‌کنیم",
          "ن",
          "ناامید",
          "ناخواسته",
          "ناراضی اند",
          "ناشی",
          "نام",
          "ناگاه",
          "ناگزیر",
          "ناگهان",
          "ناگهانی",
          "نباید",
          "نبش",
          "نبود",
          "نخست",
          "نخستین",
          "نخواهد",
          "نخواهم",
          "نخواهند",
          "نخواهی",
          "نخواهید",
          "نخواهیم",
          "نخودی",
          "ندارد",
          "ندارم",
          "ندارند",
          "نداری",
          "ندارید",
          "نداریم",
          "نداشت",
          "نداشتم",
          "نداشتند",
          "نداشته",
          "نداشتی",
          "نداشتید",
          "نداشتیم",
          "نزد",
          "نزدِ",
          "نزدیک",
          "نزدیکِ",
          "نسبتا",
          "نشان",
          "نشده",
          "نظیر",
          "نفرند",
          "نماید",
          "نموده",
          "نمی",
          "نمی‌شود",
          "نمی‌کند",
          "نه",
          "نه تنها",
          "نهایتا",
          "نهایتاً",
          "نوع",
          "نوعاً",
          "نوعی",
          "نکرده",
          "نکن",
          "نکند",
          "نکنم",
          "نکنند",
          "نکنی",
          "نکنید",
          "نکنیم",
          "نگاه",
          "نگو",
          "نیازمندند",
          "نیز",
          "نیست",
          "نیستم",
          "نیستند",
          "نیستیم",
          "نیمی",
          "ه",
          "ها",
          "های",
          "هایی",
          "هبچ",
          "هر",
          "هر از گاهی",
          "هر چند",
          "هر چند که",
          "هر چه",
          "هرچند",
          "هرچه",
          "هرکس",
          "هرگاه",
          "هرگز",
          "هزار",
          "هست",
          "هستم",
          "هستند",
          "هستی",
          "هستید",
          "هستیم",
          "هفت",
          "هق هق کنان",
          "هم",
          "هم اکنون",
          "هم اینک",
          "همان",
          "همان طور که",
          "همان گونه که",
          "همانا",
          "همانند",
          "همانها",
          "همدیگر",
          "همزمان",
          "همه",
          "همه روزه",
          "همه ساله",
          "همه شان",
          "همهٌ",
          "همه‌اش",
          "همواره",
          "همچنان",
          "همچنان که",
          "همچنین",
          "همچون",
          "همچین",
          "همگان",
          "همگی",
          "همیشه",
          "همین",
          "همین که",
          "هنوز",
          "هنگام",
          "هنگامِ",
          "هنگامی",
          "هنگامی که",
          "هوی",
          "هی",
          "هیچ",
          "هیچ گاه",
          "هیچکدام",
          "هیچکس",
          "هیچگاه",
          "هیچگونه",
          "هیچی",
          "و",
          "و لا غیر",
          "وابسته اند",
          "واقعا",
          "واقعاً",
          "واقعی",
          "واقفند",
          "واما",
          "وای",
          "وجود",
          "وحشت زده",
          "وسطِ",
          "وضع",
          "وقتی",
          "وقتی که",
          "وقتیکه",
          "ولی",
          "وگرنه",
          "وگو",
          "وی",
          "ویا",
          "ویژه",
          "ّه",
          "٪",
          "پ",
          "پارسال",
          "پارسایانه",
          "پاره‌ای",
          "پاعینِ",
          "پایین ترند",
          "پدرانه",
          "پرسان",
          "پروردگارا",
          "پریروز",
          "پس",
          "پس از",
          "پس فردا",
          "پشت",
          "پشتوانه اند",
          "پشیمونی",
          "پنج",
          "پهن شده",
          "پی",
          "پی درپی",
          "پیدا",
          "پیداست",
          "پیرامون",
          "پیش",
          "پیشاپیش",
          "پیشتر",
          "پیشِ",
          "پیوسته",
          "چ",
          "چاپلوسانه",
          "چت",
          "چته",
          "چرا",
          "چرا که",
          "چشم بسته",
          "چطور",
          "چقدر",
          "چنان",
          "چنانچه",
          "چنانکه",
          "چند",
          "چند روزه",
          "چندان",
          "چنده",
          "چندین",
          "چنین",
          "چه",
          "چه بسا",
          "چه طور",
          "چهار",
          "چو",
          "چون",
          "چکار",
          "چگونه",
          "چی",
          "چیز",
          "چیزی",
          "چیزیست",
          "چیست",
          "چیه",
          "ژ",
          "ک",
          "کارند",
          "کاش",
          "کاشکی",
          "کامل",
          "کاملا",
          "کاملاً",
          "کتبا",
          "کجا",
          "کجاست",
          "کدام",
          "کرد",
          "کردم",
          "کردن",
          "کردند",
          "کرده",
          "کردی",
          "کردید",
          "کردیم",
          "کس",
          "کسانی",
          "کسی",
          "کل",
          "کلا",
          "کلی",
          "کلیه",
          "کم",
          "کم کم",
          "کمااینکه",
          "کماکان",
          "کمتر",
          "کمتره",
          "کمتری",
          "کمی",
          "کن",
          "کنار",
          "کنارش",
          "کنارِ",
          "کنایه‌ای",
          "کند",
          "کنم",
          "کنند",
          "کننده",
          "کنون",
          "کنونی",
          "کنی",
          "کنید",
          "کنیم",
          "که",
          "کو",
          "کَی",
          "کی",
          "گ",
          "گاه",
          "گاهی",
          "گذاری",
          "گذاشته",
          "گذشته",
          "گردد",
          "گردند",
          "گرفت",
          "گرفتارند",
          "گرفتم",
          "گرفتن",
          "گرفتند",
          "گرفته",
          "گرفتی",
          "گرفتید",
          "گرفتیم",
          "گروهی",
          "گرچه",
          "گفت",
          "گفتم",
          "گفتن",
          "گفتند",
          "گفته",
          "گفتی",
          "گفتید",
          "گفتیم",
          "گه",
          "گهگاه",
          "گو",
          "گونه",
          "گوی",
          "گویا",
          "گوید",
          "گویم",
          "گویند",
          "گویی",
          "گویید",
          "گوییم",
          "گیر",
          "گیرد",
          "گیرم",
          "گیرند",
          "گیری",
          "گیرید",
          "گیریم",
          "ی",
          "یا",
          "یاب",
          "یابد",
          "یابم",
          "یابند",
          "یابی",
          "یابید",
          "یابیم",
          "یارب",
          "یافت",
          "یافتم",
          "یافتن",
          "یافته",
          "یافتی",
          "یافتید",
          "یافتیم",
          "یعنی",
          "یقینا",
          "یقیناً",
          "یه",
          "یواش یواش",
          "یک",
          "یک جوری",
          "یک کم",
          "یک کمی",
          "یکدیگر",
          "یکریز",
          "یکسال",
          "یکهزار",
          "یکی",
          "۰",
          "۱",
          "۲",
          "۳",
          "۴",
          "۵",
          "۶",
          "۷",
          "۸",
          "۹",
          "…",
          "و"
        ];

        var Engs = [];
        var Likes = [];
        var Dates = [];
        var Comments = [];
        var CalenderChartData = [];
        var MTv = 0;
        var MTi = 0;
        var MTc = 0;
        var words = [];

        const followers_count =
          responseJson.graphql.user.edge_followed_by.count;

        responseJson.graphql.user.edge_owner_to_timeline_media.edges.map(x => {
          if (x.node.edge_media_to_caption.edges[0] !== undefined) {
            String(x.node.edge_media_to_caption.edges[0].node.text)
              .split(" ")
              .forEach(w => {
                if (!stopwords.includes(w.trim())) words.push(w);
              });
          }

          switch (x.node.__typename) {
            case "GraphImage":
              MTi++;
              break;
            case "GraphVideo":
              MTv++;
              break;
            case "GraphSidecar":
              MTc++;
              break;
            default:
              break;
          }

          //Dates
          var d = new Date(Number(x.node.taken_at_timestamp + "000"));
          var mm = String(d.getMonth()).padStart(2, "0");
          var dd = String(d.getDate()).padStart(2, "0");
          var yy = d.getFullYear();

          //Engs
          var e =
            ((x.node.edge_liked_by.count + x.node.edge_media_to_comment.count) /
              followers_count) *
            100;

          Dates.push(d.toLocaleDateString());
          Engs.push(e);

          Likes.push(x.node.edge_liked_by.count);
          Comments.push(x.node.edge_media_to_comment.count);

          CalenderChartData.push({
            day: yy + "-" + mm + "-" + dd,
            value: e
          });
          return null;
        });

        //Calc Cloud Words
        var cloudwordss = [];
        words.sort();
        var current = null;
        var cnt = 0;
        for (var i = 0; i < words.length; i++) {
          if (words[i] != current) {
            if (cnt > 0) {
              cloudwordss.push({
                text: current.trim().replace("↵#", ""),
                value: cnt
              });
              // console.log(current + " comes --> " + cnt + " times<br>");
            }
            current = words[i];
            cnt = 1;
          } else {
            cnt++;
          }
        }
        if (cnt > 0) {
          cloudwordss.push({
            text: current.trim().replace("↵#", ""),
            value: cnt
          });
          // console.log(current + " comes --> " + cnt + " times");
        }

        //Calc TotalEngagement
        var TotalEngagement =
          ((Likes.reduce((a, b) => a + b, 0) +
            Comments.reduce((a, b) => a + b, 0)) /
            12 /
            followers_count) *
          100;

        //Like Comment Per Post Chart
        var LCChart = {
          chartdata: {
            labels: Dates,
            datasets: [
              {
                label: "Like",
                backgroundColor: "rgba(250,126,30,0.4)",
                borderColor: "#fa7e1e",
                data: Likes,
                yAxisID: "y-axis-1"
              },
              {
                label: "Comment",
                backgroundColor: "rgba(214,41,118,0.4)",
                borderColor: "#d62976",
                data: Comments,
                yAxisID: "y-axis-2"
              }
            ]
          },
          chartoption: {
            responsive: true,
            hoverMode: "index",
            stacked: false,
            title: {
              display: true,
              text: "Like & Comment through time"
            },
            scales: {
              yAxes: [
                {
                  type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: "left",
                  id: "y-axis-1"
                },
                {
                  type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: "right",
                  id: "y-axis-2",

                  // grid line settings
                  gridLines: {
                    drawOnChartArea: false // only want the grid lines for one axis to show up
                  }
                }
              ]
            }
          }
        };

        //Like Comment Eng Per Post Chart
        var LCEChart = {
          chartdata: {
            labels: Dates,
            datasets: [
              {
                type: "bar",
                label: "Like",
                backgroundColor: "rgba(250,126,30,0.4)",
                borderColor: "#fa7e1e",
                data: Likes,
                yAxisID: "y-axis-1"
              },
              {
                type: "bar",
                label: "Comment",
                backgroundColor: "rgba(214,41,118,0.4)",
                borderColor: "#d62976",
                data: Comments,
                yAxisID: "y-axis-1"
              },
              {
                type: "line",
                fill: false,
                label: "Engagement",
                backgroundColor: "rgba(150,47,191,0.4)",
                borderColor: "#962fbf",
                data: Engs,
                yAxisID: "y-axis-2"
              }
            ]
          },
          chartoption: {
            responsive: true,
            hoverMode: "index",
            stacked: false,
            title: {
              display: true,
              text: "Like & Comment & Engagement through time"
            },
            scales: {
              yAxes: [
                {
                  type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: "left",
                  id: "y-axis-1",

                  // grid line settings
                  gridLines: {
                    drawOnChartArea: false // only want the grid lines for one axis to show up
                  }
                },
                {
                  type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                  display: true,
                  position: "right",
                  id: "y-axis-2",

                  // grid line settings
                  gridLines: {
                    drawOnChartArea: false // only want the grid lines for one axis to show up
                  }
                }
              ]
            }
          }
        };

        //Like Comment Eng Per Post Chart
        var MTPChart = {
          chartdata: {
            labels: ["Video", "Picture", "Carousel"],
            datasets: [
              {
                data: [MTi, MTv, MTc],
                backgroundColor: ["#E1306C", "#405DE6", "#F77737"],
                labels: "Media Type"
              }
            ]
          },
          chartoption: {
            responsive: true
          }
        };

        const distinct = (value, index, self) => {
          return self.indexOf(value) === index;
        };

        console.log(words.filter(distinct));
        this.setState(
          {
            isLoading: false,
            LCChart: LCChart,
            LCEChart: LCEChart,
            MTPChart: MTPChart,
            words: cloudwordss,
            CalenderChartData: CalenderChartData,
            dataSource: responseJson,
            totaleng: TotalEngagement,
            avglike: Likes.reduce((a, b) => a + b, 0) / 12,
            avgcomment: Comments.reduce((a, b) => a + b, 0) / 12
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    return this.fetchData();
  }

  render() {
    if (this.state.isLoading) {
      // if (true) {
      // if (false) {
      return (
        <div className="h-100 container-fluid text-center align-content-center">
          <br />
          <h1 className="text-left">Loading</h1>
          <img
            className="img-fluid mx-auto align-self-center"
            alt="loading"
            src="./loading.png"
          />
        </div>
      );
    }

    return (
      <div className="container">
        <NavBar />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col">
            <div
              className="card igs-card card-2 border-0"
              style={{
                backgroundColor: "unset",
                backdropFilter: "saturate(80%) blur(4px)"
              }}
            >
              <div className="card-body">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text border-0"
                      style={{
                        backgroundColor: "unset",
                        color: "#000"
                      }}
                    >
                      @
                    </span>
                  </div>
                  <input
                    name="username"
                    type="text"
                    value={this.state.username}
                    className="form-control"
                    placeholder="Username"
                    onChange={this.handleInputChange}
                    style={{
                      backgroundColor: "transparent",
                      borderColor: "#000",
                      color: "#000",
                      border: "none",
                      borderRadius: "0",
                      borderBottom: "#000 solid 1px"
                    }}
                  />
                  <div className="input-group-append">
                    <button
                      onClick={this.fetchData}
                      className="btn btn-outline-dark"
                      type="button"
                    >
                      Fetch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-4">
            <ProfileCardv2
              fullname={this.state.dataSource.graphql.user.full_name}
              picture={this.state.dataSource.graphql.user.profile_pic_url_hd}
              bio={this.state.dataSource.graphql.user.biography}
            />
          </div>
          <div className="col-md-8 align-self-center">
            <div
              className="card igs-card card-2 border-0"
              style={{
                // backgroundColor: "rgba(227,227,227,0.7)",
                backgroundColor: "unset",
                backdropFilter: "saturate(80%) blur(4px)"
              }}
            >
              <div className="card-body">
                <div className="row">
                  <Feature
                    icon="ico/commission (1).png"
                    title="Commission"
                    value="$52,200"
                    bgcolor="#405DE6"
                    kir={this.state.dataSource.graphql.user.profile_pic_url_hd}
                  />
                  <Feature
                    icon="ico/social-engagement.png"
                    title="Engagement"
                    value={this.state.totaleng.toFixed(2) + "%"}
                    kir={this.state.dataSource.graphql.user.profile_pic_url_hd}
                    bgcolor="#833AB4"
                  />
                  <Feature
                    icon="ico/social-campaign (1).png"
                    title="Likes/p"
                    value={parseInt(
                      this.state.avglike.toFixed(0)
                    ).toLocaleString()}
                    kir={this.state.dataSource.graphql.user.profile_pic_url_hd}
                    bgcolor="#FFDC80"
                  />
                  <Feature
                    icon="ico/social-media (1).png"
                    title="Comments/p"
                    value={parseInt(
                      this.state.avgcomment.toFixed(0)
                    ).toLocaleString()}
                    kir={this.state.dataSource.graphql.user.profile_pic_url_hd}
                    bgcolor="#E1306C"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row ">
          <div className="col-md-6 mb-4">
            <div
              className="card igs-card card-2 border-0"
              style={{
                backgroundColor: "unset",
                backdropFilter: "saturate(80%) blur(4px)"
              }}
            >
              <div className="card-body">
                <Line
                  options={this.state.LCChart.chartoption}
                  data={this.state.LCChart.chartdata}
                  legend={this.state.legend}
                  height={192}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div
              className="card igs-card card-2 border-0"
              style={{
                backgroundColor: "unset",
                backdropFilter: "saturate(80%) blur(4px)"
              }}
            >
              <div className="card-body">
                <Bar
                  options={this.state.LCEChart.chartoption}
                  data={this.state.LCEChart.chartdata}
                  legend={this.state.legend}
                  height={192}
                />
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-4">
            <div
              className="card igs-card card-2 border-0"
              style={{
                backgroundColor: "unset",
                backdropFilter: "saturate(80%) blur(4px)"
              }}
            >
              <div className="card-body" style={{ height: "192px" }}>
                <ResponsiveCalendarCanvas
                  data={this.state.CalenderChartData}
                  from={this.state.CalenderChartData[0].day}
                  to={this.state.CalenderChartData[11].day}
                  emptyColor="#eeeeee"
                  colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
                  margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
                  yearSpacing={10}
                  monthBorderColor="#ffffff"
                  dayBorderWidth={2}
                  dayBorderColor="#ffffff"
                  legends={[
                    {
                      anchor: "bottom-right",
                      direction: "row",
                      translateY: 32,
                      itemCount: 4,
                      itemWidth: 42,
                      itemHeight: 36,
                      itemsSpacing: 14,
                      itemDirection: "right-to-left"
                    }
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div
              className="card igs-card card-2 border-0"
              style={{
                backgroundColor: "unset",
                backdropFilter: "saturate(80%) blur(4px)"
              }}
            >
              <div className="card-body">
                <Pie
                  options={this.state.MTPChart.chartoption}
                  data={this.state.MTPChart.chartdata}
                  legend={this.state.legend}
                  height={192}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4 align-self-center">
            <div
              className="card igs-card card-2 border-0"
              style={{
                backgroundColor: "unset",
                backdropFilter: "saturate(80%) blur(4px)"
              }}
            >
              <div className="card-body">
                <ReactWordcloud words={this.state.words} />
              </div>
            </div>
          </div>
        </div>
        
        {/* NavBar */}
        {/* Title Card */}
        {/* Search Card */}
        {/* <div className="card border-0 shadow mb-4">
          <div className="card-body">
            <div className="input-group">
              <div className="input-group-prepend">
                <span
                  className="input-group-text border-0"
                  style={{
                    backgroundColor: "#343a40",
                    color: "#fcd734"
                  }}
                >
                  @
                </span>
              </div>
              <input
                name="username"
                type="text"
                value={this.state.username}
                className="form-control"
                placeholder="Username"
                onChange={this.handleInputChange}
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#000",
                  color: "#000",
                  border: "none",
                  borderRadius: "0",
                  borderBottom: "#000 solid 1px"
                }}
              />
              <div className="input-group-append">
                <button
                  onClick={this.fetchData}
                  className="btn btn-outline-dark"
                  type="button"
                >
                  Fetch
                </button>
              </div>
            </div>
          </div>
        </div>  */}
        {/* Profile Card */}
        {/* <ProfileCard
          fullname={this.state.dataSource.graphql.user.full_name}
          picture={this.state.dataSource.graphql.user.profile_pic_url_hd}
          bio={this.state.dataSource.graphql.user.biography}
        /> */}
        <br />
        <br />
        <br />
        <br />
        <br />
        {/* <ProfileCardGlass /> */}
        {/* Followers / S */}
        {/* Tiles */}
        {/* <br />
        <div className="row text-center">
          <div className="col">

          </div>
        </div>

        <br />
        <div className="row text-center">
          <div className="col">
            <div className="card border-0 shadow">
              <div className="card-body">

              </div>
            </div>
          </div>
        </div>
        <br /> */}
      </div>
    );
  }
}
