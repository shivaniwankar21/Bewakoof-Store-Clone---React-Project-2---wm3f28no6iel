import { useAuth } from "../Providers/AuthProvider";

// API BASE URL
export const API_BASE_URL = `https://academics.newtonschool.co`;

// Home Component start
export const responsiveOptions = [
  {
    breakpoint: "1400px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
];

// best deals break points
export const bestDealsResponsiveOptions = [
  {
    breakpoint: "1400px",
    numVisible: 5,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
];

export const getSliderImageObject = [
  "https://images.bewakoof.com/uploads/grid/app/12Birthday-extend-1x1-common-1712938923.jpg",
  "https://images.bewakoof.com/uploads/grid/app/1x4-summerpalooza-ik-ezgif-com-optimize-1711301716.gif",
  "https://images.bewakoof.com/uploads/grid/app/YFED-1x1-RM-CoOrds-01-1712903980.jpg",

  "https://images.bewakoof.com/uploads/grid/app/Peanuts-YFED-1x1-Graphic-final-1711690450.jpg",
  "https://images.bewakoof.com/uploads/grid/app/1x1-MARCH-GPOT-Common-ezgif-com-optimize--2--1711457859.gif",
  "https://images.bewakoof.com/uploads/grid/app/1x1-Epic-Fandom-Bundle-1711780965.jpg",
  "https://images.bewakoof.com/uploads/grid/app/HC---1X1----unit-change-3-1712938921.png",
  "https://images.bewakoof.com/uploads/grid/app/HC--1x1-Trendy-Jeans--1--1711457861.gif",

  "https://images.bewakoof.com/uploads/grid/app/1x4-summerpalooza-ik-ezgif-com-optimize-1711301716.gif",
  "https://images.bewakoof.com/uploads/grid/app/12th-birthday-IK-RM-1X1--2--1711780967.gif",
  "https://images.bewakoof.com/uploads/grid/app/b-day-bash-hc-1x1-1711780966.jpg",

  "https://images.bewakoof.com/uploads/grid/app/HC--1x1-Trendy-Jeans--1--1711457861.gif",
];

export const afterSliderSmallCarousal = [
  "https://images.bewakoof.com/uploads/grid/app/category-icon-Desktop-common--1--1706616684.gif",
  "https://images.bewakoof.com/uploads/grid/app/category-icon-Desktop-New-Arrivals-1706616683.jpg",
  "https://images.bewakoof.com/uploads/grid/app/category-icon-for-Desktop---1--1697613231.jpg",
  "https://images.bewakoof.com/uploads/grid/app/category-icon-Desktop--1706616685.jpg",
  "https://images.bewakoof.com/uploads/grid/app/thumbnails-Revamp-Customization--1--1693212866.jpg",
  "https://images.bewakoof.com/uploads/grid/app/thumbnails-Revamp-Combos-1693212865.gif",
  "https://images.bewakoof.com/uploads/grid/app/thumbnails-Revamp-Vote-1693212866.jpg",
  "https://images.bewakoof.com/uploads/grid/app/last-size-new-thumbnaik-1668508337.jpg",
];

export const getCategoryImageObject = () => {
  const { getGender } = useAuth();
  if (getGender === "Men") {
    return {
      hoodie:
        "https://images.bewakoof.com/t1080/men-s-blue-brain-wash-graphic-printed-oversized-hoodies-624567-1703686117-1.jpg",
      jeans:
        "https://images.bewakoof.com/t1080/men-s-blue-baggy-straight-fit-distressed-cargo-jeans-624259-1707221481-1.jpg",
      jogger:
        "https://images.bewakoof.com/t1080/men-s-green-oversized-cargo-joggers-552881-1710769630-1.jpg",
      shirt:
        "https://images.bewakoof.com/t1080/men-s-blue-striped-oversized-shirt-597301-1704957705-1.jpg",

      kurta:
        "https://images.bewakoof.com/t1080/men-s-black-relaxed-fit-long-kurta-317776-1663931262-1.jpg",
      pyjamas:
        "https://img.tatacliq.com/images/i11/437Wx649H/MP000000017622604_437Wx649H_202305211434211.jpeg",

      trouser:
        "https://images.bewakoof.com/t640/men-s-white-oversized-parachute-pants-628719-1707200253-1.jpg",
      tracksuit:
        "https://m.media-amazon.com/images/I/71yF199qw0L._AC_UY1100_.jpg",
    };
  } else if (getGender === "Women") {
    return {
      jeans:
        "https://assets.ajio.com/medias/sys_master/root/20230822/jQQG/64e3ba21ddf7791519595224/-473Wx593H-466475970-aqua-MODEL.jpg",
      jogger:
        "https://images.bewakoof.com/t1080/men-s-green-oversized-cargo-joggers-552881-1710769630-1.jpg",
      jumpsuit:
        "https://images.bewakoof.com/original/women-s-orange-jumpsuit-495715-1656163087-3.jpg",
      kurti:
        "https://images.bewakoof.com/t1080/women-s-sleevelesss-ethnic-kurti-403804-1663921044-1.jpg",
      shirt:
        "https://assets.ajio.com/medias/sys_master/root/20230519/7WSW/646794b442f9e729d79d2f53/-473Wx593H-443014940-navy-MODEL.jpg",
    };
  }
};
// export const getCategoryImageObject = {
//   hoodie:
//     "https://images.bewakoof.com/t1080/men-s-blue-brain-wash-graphic-printed-oversized-hoodies-624567-1703686117-1.jpg",
//   jeans:
//     "https://images.bewakoof.com/t1080/men-s-blue-baggy-straight-fit-distressed-cargo-jeans-624259-1707221481-1.jpg",
//   jogger:
//     "https://images.bewakoof.com/t1080/men-s-green-oversized-cargo-joggers-552881-1710769630-1.jpg",
//   jumpsuit:
//     "https://images.bewakoof.com/original/women-s-orange-jumpsuit-495715-1656163087-3.jpg",
//   shirt:
//     "https://images.bewakoof.com/t1080/men-s-blue-striped-oversized-shirt-597301-1704957705-1.jpg",

//   kurta:
//     "https://images.bewakoof.com/t1080/men-s-black-relaxed-fit-long-kurta-317776-1663931262-1.jpg",
//   kurti:
//     "https://images.bewakoof.com/t1080/women-s-sleevelesss-ethnic-kurti-403804-1663921044-1.jpg",
//   pyjamas:
//     "https://img.tatacliq.com/images/i11/437Wx649H/MP000000017622604_437Wx649H_202305211434211.jpeg",
//   shorts:
//     "https://rukminim2.flixcart.com/image/850/1000/xif0q/short/m/5/r/s-581532-bewakoof-original-imagtkahygetchsh.jpeg?q=20&crop=false",

//   trouser:
//     "https://images.bewakoof.com/t640/men-s-white-oversized-parachute-pants-628719-1707200253-1.jpg",
//   tracksuit:
//     "https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/26416968/2023/12/14/a3512d75-260e-458d-92a7-294e66f6e21d1702537939618BewakoofWomensBlueButterflyGraphicPrintedCo-ordinates1.jpg",
//   tshirt:
//     "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/4/c/4c6f336DBEWAK00023028_1.jpg?rnd=20200526195200&tr=w-512",
// };

// Banner Images
// Banner 1
export const bannerImgs = [
  "https://images.bewakoof.com/uploads/grid/app/thin-banner-desktop-blockbuster-deal-T-Shirts-Under--499-1711725886.jpg",
  " https://images.bewakoof.com/uploads/grid/app/Birthday-PREBUZZ-ThinStrip-desktop--1--1711721721.jpg",
  "https://images.bewakoof.com/uploads/grid/app/Desktop-Strip-3-1672040129.jpg",
  "https://images.bewakoof.com/uploads/grid/app/Desktop-Strip-3-1669022420.jpg",
];

// Banner Images End

//  TO HOT TO BE MISSED Section
export const toHotToMissedSectionImage = [
  " https://images.bewakoof.com/uploads/grid/app/DESKTOP---MID-SIZE-BANNER---TDD---common-1711782197.png",
  "https://images.bewakoof.com/uploads/grid/app/Buy-2-Joggers-1499-Common-Desktop-MIDSIZE-Banner-1711782196.jpg",
  " https://images.bewakoof.com/uploads/grid/app/Common-Trackpants-70-Off-Desktop-Midsize-banner-1711782197.jpg",
  " https://images.bewakoof.com/uploads/grid/app/Desktop-midsize-OS-tees-common-ezgif-com-optimize-1711782200.gif",
];

//-------------------------------- Home Component end -----------------------------

export const mySlider = [
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwguzNGlaHChVLISVT_dISedy9PAQsqqEZRB8l92dE5w&s",
    alt: "google slider",
    href: "www.google.com",
  },

  {
    src: "https://www.shutterstock.com/image-photo/kiev-ukraine-april-08-2015-260nw-277441490.jpg",
    alt: "facebook page",
    href: "www.facebook.com",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaUfswEhsAnkW6nQEVfWRxEFuIjXZRdJPE556Cw7p66A&s",
    alt: "Twetter page",
    href: "www.tweeter.com",
  },
];
