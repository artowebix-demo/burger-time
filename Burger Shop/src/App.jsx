import React, { useEffect, useRef, useState } from "react";
import "./styles.css";

/* =========================================================
   BURGER TIME
   HYBRID CINEMATIC EXPERIENCE
   240 HD FRAMES
========================================================= */

const FRAME_COUNT = 240;

/* =========================================================
   FRAME CHAPTERS
========================================================= */

const FRAME_CHAPTERS = {
  hero: {
    start: 0,
    end: 42,
  },

  ingredients: {
    start: 43,
    end: 95,
  },

  menu: {
    start: 96,
    end: 135,
  },

  builder: {
    start: 136,
    end: 185,
  },

  story: {
    start: 186,
    end: 215,
  },

  finale: {
    start: 216,
    end: 239,
  },
};

/* =========================================================
   MENU
========================================================= */

const menu = {
  "Basic Burgers": [
    { id: "01", name: "Classic Veg Crunch", price: 99, tag: "VEG", heat: 0, veg: true, description: "Crispy vegetable patty, lettuce, onion and creamy house mayo in a toasted bun.", note: "Crisp · fresh · easy" },
    { id: "02", name: "Chicken Snacker", price: 119, tag: "CHICKEN", heat: 1, veg: false, description: "Crispy chicken patty, crunchy lettuce and pepper mayo in a soft toasted bun.", note: "Crunchy · juicy · classic" },
    { id: "03", name: "Cheesy Veg Crunch", price: 129, tag: "CHEESY", heat: 0, veg: true, description: "Vegetable patty with molten cheese, lettuce, onion and creamy burger sauce.", note: "Cheesy · crisp · creamy" },
  ],
  "Regular Burgers": [
    { id: "01", name: "Chicken Jack", price: 169, tag: "POPULAR", heat: 1, veg: false, description: "Crispy chicken, cheese, lettuce, onion, pickles and smoky house sauce.", note: "Smoky · crunchy · juicy" },
    { id: "02", name: "Chicken Classic", price: 189, tag: "CLASSIC", heat: 1, veg: false, description: "A hearty chicken burger layered with cheese, fresh vegetables and signature sauce.", note: "Balanced · filling · familiar" },
    { id: "03", name: "Mexican Veg", price: 179, tag: "VEG", heat: 2, veg: true, description: "Crispy veg patty, jalapeños, salsa-style relish, cheese and chipotle mayo.", note: "Tangy · spicy · cheesy" },
    { id: "04", name: "Tandoori Paneer", price: 209, tag: "VEG", heat: 2, veg: true, description: "Tandoori paneer, onions, lettuce, cheese and smoky makhani mayo.", note: "Smoky · creamy · bold" },
  ],
  "Gourmet Burgers": [
    { id: "01", name: "Smoked Peri Peri", price: 249, tag: "HOT", heat: 3, veg: false, description: "Juicy chicken, smoked cheese, peri-peri relish, jalapeños and fire mayo.", note: "Hot · smoky · punchy" },
    { id: "02", name: "Juicy Cheese Chicken", price: 269, tag: "BESTSELLER", heat: 1, veg: false, description: "Double-layer chicken, molten cheese, caramelised onion, pickles and creamy house sauce.", note: "Juicy · cheesy · rich" },
    { id: "03", name: "Double Trouble", price: 299, tag: "DOUBLE", heat: 2, veg: false, description: "Two chicken patties, double cheese, crunchy onions and a bold smoky sauce stack.", note: "Big · cheesy · loaded" },
    { id: "04", name: "Ultimate Veg Cheese", price: 259, tag: "VEG", heat: 1, veg: true, description: "Loaded vegetable patty, paneer, double cheese, lettuce and signature creamy sauce.", note: "Loaded · creamy · satisfying" },
  ],
  Wraps: [
    { id: "01", name: "Crispy Chicken Wrap", price: 189, tag: "CHICKEN", heat: 1, veg: false, description: "Crispy chicken strips, lettuce, onion and creamy sauce rolled in a warm tortilla.", note: "Crispy · fresh · handheld" },
    { id: "02", name: "Peri Peri Chicken Wrap", price: 209, tag: "SPICY", heat: 3, veg: false, description: "Chicken, peri-peri seasoning, crunchy vegetables and fire mayo in a toasted wrap.", note: "Spicy · smoky · juicy" },
    { id: "03", name: "Paneer Tandoori Wrap", price: 199, tag: "VEG", heat: 2, veg: true, description: "Tandoori paneer, onions, lettuce and makhani mayo wrapped and toasted.", note: "Tandoori · creamy · filling" },
  ],
  Pizza: [
    { id: "01", name: "Loaded Chicken Pizza", price: 299, tag: "LOADED", heat: 1, veg: false, description: "Cheesy pizza topped with seasoned chicken, onion, capsicum and house drizzle.", note: "Cheesy · savoury · loaded" },
    { id: "02", name: "Fiery Chicken Pizza", price: 329, tag: "HOT", heat: 3, veg: false, description: "Chicken, jalapeños, chilli flakes, cheese and spicy fire sauce.", note: "Fiery · cheesy · bold" },
    { id: "03", name: "Garden Cheese Pizza", price: 269, tag: "VEG", heat: 1, veg: true, description: "Capsicum, onion, corn, tomato and generous cheese over a seasoned pizza base.", note: "Fresh · cheesy · colourful" },
  ],
  "Chicken Sides": [
    { id: "01", name: "Chicken Popcorn", price: 169, tag: "CRISPY", heat: 1, veg: false, description: "Bite-sized crispy chicken pieces seasoned hot and served for easy snacking.", note: "Bites · crunch · juicy" },
    { id: "02", name: "Chicken Strips", price: 219, tag: "CRISPY", heat: 1, veg: false, description: "Tender chicken strips in a crunchy seasoned coating.", note: "Tender · crisp · satisfying" },
    { id: "03", name: "Hot Wings", price: 239, tag: "HOT", heat: 3, veg: false, description: "Crispy wings tossed with a fiery chilli glaze.", note: "Sticky · spicy · bold" },
    { id: "04", name: "Drumsticks", price: 249, tag: "SIGNATURE", heat: 2, veg: false, description: "Juicy seasoned chicken drumsticks with a crisp exterior.", note: "Juicy · crisp · hearty" },
    { id: "05", name: "Chicken Nuggets", price: 149, tag: "CLASSIC", heat: 0, veg: false, description: "Golden chicken nuggets with a crunchy coating and tender centre.", note: "Golden · tender · snackable" },
  ],
  "Fries & Sides": [
    { id: "01", name: "Classic Fries", price: 119, tag: "CLASSIC", heat: 0, veg: true, description: "Golden fries finished with sea salt and Burger Time seasoning.", note: "Golden · crisp · salted" },
    { id: "02", name: "Peri Peri Fries", price: 139, tag: "SPICY", heat: 2, veg: true, description: "Crispy fries dusted generously with peri-peri seasoning.", note: "Spicy · crunchy · addictive" },
    { id: "03", name: "Loaded Cheese Fries", price: 189, tag: "LOADED", heat: 1, veg: true, description: "Fries layered with molten cheese, jalapeños, onions and house sauce.", note: "Cheesy · loaded · indulgent" },
    { id: "04", name: "Veg Nuggets", price: 139, tag: "VEG", heat: 0, veg: true, description: "Crunchy vegetable nuggets served golden and hot.", note: "Crisp · light · snackable" },
  ],
  Dips: [
    { id: "01", name: "Smoky Mayo", price: 39, tag: "DIP", heat: 1, veg: true, description: "Creamy mayo with a subtle smoky finish.", note: "Creamy · smoky · smooth" },
    { id: "02", name: "Fire Mayo", price: 39, tag: "HOT", heat: 3, veg: true, description: "Creamy chilli mayo made for wings, fries and burgers.", note: "Creamy · hot · punchy" },
    { id: "03", name: "Cheese Dip", price: 49, tag: "CHEESE", heat: 0, veg: true, description: "Warm, smooth cheese dip for dunking your favourite sides.", note: "Cheesy · smooth · rich" },
  ],
  Beverages: [
    { id: "01", name: "Cold Coffee", price: 149, tag: "COFFEE", heat: 0, veg: true, description: "Chilled creamy coffee blended smooth and served ice cold.", note: "Cold · creamy · bold" },
    { id: "02", name: "Dark Chocolate Shake", price: 189, tag: "SHAKE", heat: 0, veg: true, description: "Rich dark chocolate blended into a thick creamy shake.", note: "Dark · thick · silky" },
    { id: "03", name: "Biscoff Shake", price: 209, tag: "SHAKE", heat: 0, veg: true, description: "Biscoff spread, vanilla cream and biscuit crumble blended thick.", note: "Caramelised · creamy · smooth" },
    { id: "04", name: "Lemon Iced Tea", price: 119, tag: "COOLER", heat: 0, veg: true, description: "Refreshing lemon iced tea served chilled.", note: "Citrus · chilled · refreshing" },
  ],
  Desserts: [
    { id: "01", name: "Chocolate Brownie", price: 149, tag: "DESSERT", heat: 0, veg: true, description: "Dense chocolate brownie with a soft fudgy centre.", note: "Fudgy · rich · chocolate" },
    { id: "02", name: "Biscoff Sundae", price: 179, tag: "DESSERT", heat: 0, veg: true, description: "Creamy vanilla dessert layered with Biscoff spread and biscuit crumble.", note: "Creamy · crunchy · caramelised" },
  ],
};

/* =========================================================
   INGREDIENT HOTSPOTS
========================================================= */

const ingredients = [
  {
    id: "01",
    name: "TOASTED BUN",
    label: "THE FOUNDATION",

    description:
      "Soft inside. Golden outside. Lightly toasted so the burger keeps its structure without losing softness.",

    position: {
      desktop: {
        left: "56%",
        top: "22%",
      },

      mobile: {
        left: "72%",
        top: "25%",
      },
    },
  },

  {
    id: "02",
    name: "AGED CHEDDAR",
    label: "THE MELT",

    description:
      "Rich aged cheddar melted directly over the hot smash while the crust is still forming.",

    position: {
      desktop: {
        left: "67%",
        top: "43%",
      },

      mobile: {
        left: "77%",
        top: "43%",
      },
    },
  },

  {
    id: "03",
    name: "SMASHED HOT",
    label: "THE CRUST",

    description:
      "Pressed onto a ripping-hot surface to create deep caramelisation, crispy edges and a juicy centre.",

    position: {
      desktop: {
        left: "39%",
        top: "57%",
      },

      mobile: {
        left: "24%",
        top: "57%",
      },
    },
  },

  {
    id: "04",
    name: "TIME SAUCE",
    label: "THE FINISH",

    description:
      "Creamy, smoky and tangy with enough sweetness to bring the whole burger together.",

    position: {
      desktop: {
        left: "61%",
        top: "70%",
      },

      mobile: {
        left: "68%",
        top: "70%",
      },
    },
  },
];

/* =========================================================
   BUILDER
========================================================= */

const buildOptions = [
  {
    id: "01",
    title: "STACK",

    options: [
      {
        name: "Single Smash",
        price: 0,
        frame: 140,
      },

      {
        name: "Double Smash",
        price: 80,
        frame: 150,
      },

      {
        name: "Triple Smash",
        price: 150,
        frame: 160,
      },
    ],
  },

  {
    id: "02",
    title: "CHEESE",

    options: [
      {
        name: "Aged Cheddar",
        price: 0,
        frame: 165,
      },

      {
        name: "Smoked Cheese",
        price: 40,
        frame: 170,
      },

      {
        name: "Double Cheese",
        price: 60,
        frame: 174,
      },
    ],
  },

  {
    id: "03",
    title: "SAUCE",

    options: [
      {
        name: "Time Sauce",
        price: 0,
        frame: 176,
      },

      {
        name: "Fire Mayo",
        price: 25,
        frame: 180,
      },

      {
        name: "Truffle Mayo",
        price: 60,
        frame: 184,
      },
    ],
  },
];

/* =========================================================
   FLAVOUR FINDER
========================================================= */

const flavourFinder = [
  {
    mood: "CLASSIC",
    burger: "The Signature",
    detail:
      "Balanced, familiar and built around the Burger Time house sauce.",
  },

  {
    mood: "SPICY",
    burger: "Oxblood Fire",
    detail:
      "Jalapeños, chilli relish and fire mayo with serious heat.",
  },

  {
    mood: "RICH",
    burger: "Truffle Melt",
    detail:
      "Truffle mayo, mushrooms and aged cheddar for a deeper flavour.",
  },

  {
    mood: "VEG",
    burger: "Paneer Royale",
    detail:
      "Crispy paneer with cheddar and smoky makhani mayo.",
  },
];

/* =========================================================
   REVIEWS
========================================================= */

const reviews = [
  {
    quote:
      "Crispy edges, juicy centre and one of the best sauces I've had on a smash burger.",

    name: "Rohan M.",
    location: "Mumbai",
    rating: "4.9",
  },

  {
    quote:
      "The Truffle Melt feels genuinely premium without becoming too heavy.",

    name: "Aarav S.",
    location: "Thane",
    rating: "4.8",
  },

  {
    quote:
      "Paneer Royale is exactly what a vegetarian burger should be — crispy, proper and satisfying.",

    name: "Meera K.",
    location: "Mumbai",
    rating: "5.0",
  },

  {
    quote:
      "Oxblood Fire has real heat but you can still taste everything underneath it.",

    name: "Kabir P.",
    location: "Navi Mumbai",
    rating: "4.9",
  },
];

/* =========================================================
   FAQ
========================================================= */

const faqs = [
  {
    question:
      "Are Burger Time burgers cooked fresh?",

    answer:
      "Yes. Burgers are assembled fresh and cooked to order for the best crust, temperature and texture.",
  },

  {
    question:
      "Do you have vegetarian burgers?",

    answer:
      "Yes. Paneer Royale is our featured vegetarian option.",
  },

  {
    question:
      "Can I customise my burger?",

    answer:
      "The Burger Lab on this website lets you explore different stacks, cheeses and sauces.",
  },

  {
    question:
      "Can I order through this website?",

    answer:
      "No. This website is currently a frontend-only interactive restaurant experience and does not process online orders.",
  },

  {
    question:
      "Does Burger Lab place an order?",

    answer:
      "No. Burger Lab is an interactive configurator only. Prices shown are illustrative menu calculations.",
  },

  {
    question:
      "Is takeaway available?",

    answer:
      "Current takeaway availability can be confirmed directly with Burger Time.",
  },
];

/* =========================================================
   APP
========================================================= */

export default function App() {
  const canvasRef = useRef(null);

  const imagesRef = useRef([]);

  const currentFrame = useRef(0);
  const targetFrame = useRef(0);

  const animationRef = useRef(null);

  const [loaded, setLoaded] =
    useState(0);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [
    activeIngredient,
    setActiveIngredient,
  ] = useState(0);

  const [
    menuCategory,
    setMenuCategory,
  ] = useState("Basic Burgers");

  const [
    menuIndex,
    setMenuIndex,
  ] = useState(0);

  const [menuSearch, setMenuSearch] = useState("");
  const [dietFilter, setDietFilter] = useState("ALL");

  const [
    builder,
    setBuilder,
  ] = useState([1, 0, 0]);

  const [
    finderResult,
    setFinderResult,
  ] = useState(null);

  const [
    reviewIndex,
    setReviewIndex,
  ] = useState(0);

  const [
    faqOpen,
    setFaqOpen,
  ] = useState(null);

  const [
    favourites,
    setFavourites,
  ] = useState([]);

  const [
    activeChapter,
    setActiveChapter,
  ] = useState("hero");

  const [
    scrollProgress,
    setScrollProgress,
  ] = useState(0);

  const [
    isMobile,
    setIsMobile,
  ] = useState(
    window.innerWidth <= 768
  );

  const categoryMenu = menu[menuCategory] ?? [];

  const selectedMenu = categoryMenu.filter((item) => {
    const matchesDiet =
      dietFilter === "ALL" ||
      (dietFilter === "VEG" && item.veg) ||
      (dietFilter === "NON-VEG" && !item.veg);

    const query = menuSearch.trim().toLowerCase();
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query);

    return matchesDiet && matchesSearch;
  });

  const selectedItem = selectedMenu[menuIndex] || selectedMenu[0] || null;

  /* =========================================================
     FRAME SOURCE
  ========================================================= */

  const frameSrc = (index) =>
    `${
      import.meta.env.BASE_URL
    }burger_hd_frames/frame-${String(
      index
    ).padStart(4, "0")}.jpg`;

  /* =========================================================
     DRAW FRAME
  ========================================================= */

  const drawFrame = (image) => {
    const canvas =
      canvasRef.current;

    if (
      !canvas ||
      !image?.naturalWidth
    ) {
      return;
    }

    const ctx =
      canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      });

    const vw =
      window.innerWidth;

    const vh =
      window.innerHeight;

    const dpr = Math.min(
      window.devicePixelRatio || 1,
      3
    );

    const pixelWidth =
      Math.round(vw * dpr);

    const pixelHeight =
      Math.round(vh * dpr);

    if (
      canvas.width !== pixelWidth ||
      canvas.height !== pixelHeight
    ) {
      canvas.width =
        pixelWidth;

      canvas.height =
        pixelHeight;

      canvas.style.width =
        `${vw}px`;

      canvas.style.height =
        `${vh}px`;
    }

    ctx.setTransform(
      dpr,
      0,
      0,
      dpr,
      0,
      0
    );

    ctx.imageSmoothingEnabled =
      true;

    ctx.imageSmoothingQuality =
      "high";

    ctx.fillStyle = "#070807";

    ctx.fillRect(
      0,
      0,
      vw,
      vh
    );

    const imageRatio =
      image.naturalWidth /
      image.naturalHeight;

    const screenRatio =
      vw / vh;

    let drawWidth;
    let drawHeight;
    let x;
    let y;

    if (
      screenRatio >
      imageRatio
    ) {
      drawWidth = vw;

      drawHeight =
        vw / imageRatio;

      x = 0;

      y =
        (vh - drawHeight) /
        2;
    } else {
      drawHeight = vh;

      drawWidth =
        vh * imageRatio;

      x =
        (vw - drawWidth) /
        2;

      y = 0;
    }

    ctx.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight
    );
  };

  /* =========================================================
     PRELOAD
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    let completed = 0;

    const frames =
      new Array(FRAME_COUNT);

    for (
      let i = 0;
      i < FRAME_COUNT;
      i++
    ) {
      const image =
        new Image();

      image.decoding =
        "async";

      image.src =
        frameSrc(i);

      const finished = () => {
        completed++;

        if (mounted) {
          setLoaded(
            Math.round(
              (completed /
                FRAME_COUNT) *
                100
            )
          );
        }
      };

      image.onload = () => {
        finished();

        if (i === 0) {
          drawFrame(image);
        }
      };

      image.onerror =
        finished;

      frames[i] = image;
    }

    imagesRef.current =
      frames;

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================================
     SMOOTH FRAME ENGINE
  ========================================================= */

  useEffect(() => {
    let lastDrawnFrame = -1;

    const animate = () => {
      const difference =
        targetFrame.current -
        currentFrame.current;

      currentFrame.current +=
        difference * 0.09;

      if (
        Math.abs(difference) <
        0.025
      ) {
        currentFrame.current =
          targetFrame.current;
      }

      const frameIndex =
        Math.max(
          0,
          Math.min(
            FRAME_COUNT - 1,
            Math.round(
              currentFrame.current
            )
          )
        );

      if (
        frameIndex !==
        lastDrawnFrame
      ) {
        const image =
          imagesRef.current[
            frameIndex
          ];

        if (
          image?.complete &&
          image.naturalWidth
        ) {
          drawFrame(image);

          lastDrawnFrame =
            frameIndex;
        }
      }

      animationRef.current =
        requestAnimationFrame(
          animate
        );
    };

    animationRef.current =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(
        animationRef.current
      );
    };
  }, []);

  /* =========================================================
     CHAPTER FRAME MAPPING
  ========================================================= */

  useEffect(() => {
    const sections = [
      "home",
      "ingredients",
      "menu",
      "builder",
      "story",
      "finale",
    ];

    const updateFrames = () => {
      const viewportHeight =
        window.innerHeight;

      let foundChapter =
        "hero";

      sections.forEach(
        (sectionId) => {
          const section =
            document.getElementById(
              sectionId
            );

          if (!section) return;

          const rect =
            section.getBoundingClientRect();

          /*
            Section is considered active
            when viewport centre is inside it.
          */

          const viewportCenter =
            viewportHeight / 2;

          if (
            rect.top <=
              viewportCenter &&
            rect.bottom >=
              viewportCenter
          ) {
            if (
              sectionId === "home"
            ) {
              foundChapter =
                "hero";
            } else if (
              sectionId ===
              "ingredients"
            ) {
              foundChapter =
                "ingredients";
            } else if (
              sectionId ===
              "menu"
            ) {
              foundChapter =
                "menu";
            } else if (
              sectionId ===
              "builder"
            ) {
              foundChapter =
                "builder";
            } else if (
              sectionId ===
              "story"
            ) {
              foundChapter =
                "story";
            } else if (
              sectionId ===
              "finale"
            ) {
              foundChapter =
                "finale";
            }
          }
        }
      );

      setActiveChapter(
        foundChapter
      );

      let targetSectionId;

      if (
        foundChapter === "hero"
      ) {
        targetSectionId =
          "home";
      } else {
        targetSectionId =
          foundChapter;
      }

      const section =
        document.getElementById(
          targetSectionId
        );

      if (section) {
        const rect =
          section.getBoundingClientRect();

        const scrollableDistance =
          rect.height -
          viewportHeight;

        let localProgress;

        if (
          scrollableDistance <= 0
        ) {
          localProgress =
            Math.max(
              0,
              Math.min(
                1,
                -rect.top /
                  Math.max(
                    rect.height,
                    1
                  )
              )
            );
        } else {
          localProgress =
            Math.max(
              0,
              Math.min(
                1,
                -rect.top /
                  scrollableDistance
              )
            );
        }

        const chapter =
          FRAME_CHAPTERS[
            foundChapter
          ];

        targetFrame.current =
          chapter.start +
          localProgress *
            (chapter.end -
              chapter.start);
      }

      const totalScroll =
        document.documentElement
          .scrollHeight -
        viewportHeight;

      if (totalScroll > 0) {
        setScrollProgress(
          Math.max(
            0,
            Math.min(
              100,
              (window.scrollY /
                totalScroll) *
                100
            )
          )
        );
      }
    };

    window.addEventListener(
      "scroll",
      updateFrames,
      {
        passive: true,
      }
    );

    updateFrames();

    return () => {
      window.removeEventListener(
        "scroll",
        updateFrames
      );
    };
  }, []);

  /* =========================================================
     RESIZE
  ========================================================= */

  useEffect(() => {
    let timeout;

    const resize = () => {
      clearTimeout(timeout);

      timeout = setTimeout(
        () => {
          setIsMobile(
            window.innerWidth <=
              768
          );

          const frame =
            Math.round(
              currentFrame.current
            );

          const image =
            imagesRef.current[
              frame
            ];

          if (
            image?.complete
          ) {
            drawFrame(image);
          }
        },
        80
      );
    };

    window.addEventListener(
      "resize",
      resize
    );

    return () => {
      clearTimeout(timeout);

      window.removeEventListener(
        "resize",
        resize
      );
    };
  }, []);

  /* =========================================================
     REVEAL
  ========================================================= */

  useEffect(() => {
    const elements =
      document.querySelectorAll(
        "[data-reveal]"
      );

    const observer =
      new IntersectionObserver(
        (entries) => {
          entries.forEach(
            (entry) => {
              if (
                entry.isIntersecting
              ) {
                entry.target.classList.add(
                  "visible"
                );
              }
            }
          );
        },
        {
          threshold: 0.12,
        }
      );

    elements.forEach(
      (element) =>
        observer.observe(
          element
        )
    );

    return () =>
      observer.disconnect();
  }, []);

  /* =========================================================
     FAVOURITES
  ========================================================= */

  useEffect(() => {
    try {
      const stored =
        localStorage.getItem(
          "burger-time-favourites"
        );

      if (stored) {
        setFavourites(
          JSON.parse(stored)
        );
      }
    } catch {
      // Ignore storage errors.
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "burger-time-favourites",
        JSON.stringify(
          favourites
        )
      );
    } catch {
      // Ignore storage errors.
    }
  }, [favourites]);

  /* =========================================================
     MENU FUNCTIONS
  ========================================================= */

  const chooseCategory = (
    category
  ) => {
    setMenuCategory(category);

    setMenuIndex(0);
  };

  const previousMenu = () => {
    if (!selectedMenu.length) return;
    setMenuIndex(
      (previous) =>
        previous === 0
          ? selectedMenu.length -
            1
          : previous - 1
    );
  };

  const nextMenu = () => {
    if (!selectedMenu.length) return;
    setMenuIndex(
      (previous) =>
        previous ===
        selectedMenu.length -
          1
          ? 0
          : previous + 1
    );
  };

  const toggleFavourite = (
    name
  ) => {
    setFavourites(
      (previous) =>
        previous.includes(name)
          ? previous.filter(
              (item) =>
                item !== name
            )
          : [
              ...previous,
              name,
            ]
    );
  };

  /* =========================================================
     BUILDER
  ========================================================= */

  const chooseBuilder = (
    groupIndex,
    optionIndex
  ) => {
    setBuilder(
      (previous) => {
        const next = [
          ...previous,
        ];

        next[groupIndex] =
          optionIndex;

        return next;
      }
    );

    /*
      Jump frame target toward
      selected visual point.
    */

    const option =
      buildOptions[
        groupIndex
      ].options[
        optionIndex
      ];

    targetFrame.current =
      option.frame;
  };

  const builderPrice =
    219 +
    builder.reduce(
      (
        total,
        optionIndex,
        groupIndex
      ) =>
        total +
        buildOptions[
          groupIndex
        ].options[
          optionIndex
        ].price,
      0
    );

  /* =========================================================
     INGREDIENT HOTSPOT POSITION
  ========================================================= */

  const hotspotPosition = (
    ingredient
  ) =>
    isMobile
      ? ingredient.position
          .mobile
      : ingredient.position
          .desktop;

  /* =========================================================
     JSX
  ========================================================= */

  return (
    <div
      className={`burger-time chapter-${activeChapter}`}
    >
      <div className="premium-ambient" aria-hidden="true">
        <span className="ambient-orb ambient-orb-a" />
        <span className="ambient-orb ambient-orb-b" />
        <span className="ambient-grid" />
      </div>


      {/* =====================================================
          FIXED CINEMATIC FRAME STAGE
      ====================================================== */}

      <div className="cinematic-stage">

        <canvas
          ref={canvasRef}
        />

        <div className="cinematic-shade" />

        <div className="cinematic-vignette" />

        <div className="cinematic-grain" />

        <div className="cinematic-lines">
          <i />
          <i />
          <i />
        </div>

      </div>

      {/* =====================================================
          GLOBAL PROGRESS
      ====================================================== */}

      <div className="global-progress">

        <span
          style={{
            height:
              `${scrollProgress}%`,
          }}
        />

      </div>

      {/* =====================================================
          LOADER
      ====================================================== */}

      {loaded < 100 && (
        <div className="loader">

          <div className="loader-logo">
            BT
          </div>

          <small>
            BURGER TIME PRESENTS
          </small>

          <h1>
            SMASHED
            <em> WITH INTENT.</em>
          </h1>

          <div className="loader-track">

            <i
              style={{
                width:
                  `${loaded}%`,
              }}
            />

          </div>

          <strong>
            {loaded}%
          </strong>

        </div>
      )}

      {/* =====================================================
          NAV
      ====================================================== */}

      <header className="navbar">

        <a
          href="#home"
          className="brand"
          onClick={() =>
            setMenuOpen(false)
          }
        >

          <span className="brand-icon">
            BT
          </span>

          <span>
            BURGER
            <b> TIME</b>
          </span>

        </a>

        <nav
          className={
            menuOpen
              ? "open"
              : ""
          }
        >

          {[
            ["HOME", "home"],
            [
              "DETAILS",
              "ingredients",
            ],
            ["MENU", "menu"],
            ["LAB", "builder"],
            [
              "FINDER",
              "finder",
            ],
            ["STORY", "story"],
            [
              "REVIEWS",
              "reviews",
            ],
            ["FAQ", "faq"],
          ].map(
            ([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() =>
                  setMenuOpen(
                    false
                  )
                }
              >
                {label}
              </a>
            )
          )}

        </nav>

        <a
          href="#menu"
          className="nav-cta"
        >
          EXPLORE
          <span>↘</span>
        </a>

        <button
          className={`hamburger ${
            menuOpen
              ? "active"
              : ""
          }`}
          onClick={() =>
            setMenuOpen(
              (previous) =>
                !previous
            )
          }
          aria-label="Toggle navigation"
        >
          <i />
          <i />
        </button>

      </header>

      <main>
        <div className="flavour-rail" aria-hidden="true">
          <div>
            <span>SMASHED HOT</span><b>✦</b><span>BURGERS</span><b>✦</b><span>WRAPS</span><b>✦</b><span>PIZZA</span><b>✦</b><span>WINGS</span><b>✦</b><span>SHAKES</span><b>✦</b>
            <span>SMASHED HOT</span><b>✦</b><span>BURGERS</span><b>✦</b><span>WRAPS</span><b>✦</b><span>PIZZA</span><b>✦</b><span>WINGS</span><b>✦</b><span>SHAKES</span><b>✦</b>
          </div>
        </div>

        {/* ===================================================
            01 HERO
            FRAMES 000 - 042
        ==================================================== */}

        <section
          className="hybrid-hero"
          id="home"
        >

          <div className="hero-sticky">

            <div
              className="hero-content"
              data-reveal
            >

              <div className="micro-label">

                <span>
                  BT / 001
                </span>

                <i />

                <span>
                  SMASH CULTURE
                </span>

              </div>

              <div className="live-label">
                <i />
                THE GRILL IS HOT
              </div>

              <h1>

                <span>
                  SMASHED
                </span>

                <span className="hero-offset">
                  WITH
                </span>

                <em>
                  INTENT.
                </em>

              </h1>

              <div className="hero-lower">

                <p>
                  Hot grill.
                  <br />
                  Proper ingredients.
                  <br />
                  Zero shortcuts.
                </p>

                <div className="hero-buttons">

                  <a
                    href="#ingredients"
                    className="primary-button"
                  >
                    DISCOVER THE BUILD
                    <span>↓</span>
                  </a>

                  <a
                    href="#menu"
                    className="secondary-button"
                  >
                    EXPLORE MENU
                    <span>↘</span>
                  </a>

                </div>

              </div>

            </div>

            <div className="hero-floating-meta">

              <span>
                CURRENT FRAME STORY
              </span>

              <strong>
                001
              </strong>

              <p>
                Scroll to move through
                the Burger Time build.
              </p>

            </div>

            <div className="scroll-indicator">

              <span>
                SCROLL TO BUILD
              </span>

              <i>
                <b />
              </i>

            </div>

          </div>

        </section>

        {/* ===================================================
            02 INGREDIENT CINEMATIC
            FRAMES 043 - 095
        ==================================================== */}

        <section
          className="ingredient-cinema"
          id="ingredients"
        >

          <div className="ingredient-sticky">

            <div
              className="ingredient-heading"
              data-reveal
            >

              <span className="eyebrow">
                02 / THE DETAILS
              </span>

              <h2>
                EVERY
                <br />
                LAYER
                <br />
                <em>
                  MATTERS.
                </em>
              </h2>

              <p>
                Tap a hotspot to
                inspect the build.
              </p>

            </div>

            {/* HOTSPOTS */}

            <div className="hotspot-layer">

              {ingredients.map(
                (
                  ingredient,
                  index
                ) => {
                  const position =
                    hotspotPosition(
                      ingredient
                    );

                  return (
                    <button
                      key={
                        ingredient.id
                      }
                      className={`ingredient-hotspot ${
                        activeIngredient ===
                        index
                          ? "active"
                          : ""
                      }`}
                      style={{
                        left:
                          position.left,

                        top:
                          position.top,
                      }}
                      onClick={() =>
                        setActiveIngredient(
                          index
                        )
                      }
                    >

                      <span className="hotspot-dot">
                        +
                      </span>

                      <span className="hotspot-line" />

                      <strong>
                        {
                          ingredient.id
                        }
                      </strong>

                    </button>
                  );
                }
              )}

            </div>

            {/* INGREDIENT INFO */}

            <article className="ingredient-panel">

              <header>

                <span>
                  INGREDIENT /
                  {
                    ingredients[
                      activeIngredient
                    ].id
                  }
                </span>

                <b>
                  BT
                </b>

              </header>

              <small>
                {
                  ingredients[
                    activeIngredient
                  ].label
                }
              </small>

              <h3>
                {
                  ingredients[
                    activeIngredient
                  ].name
                }
              </h3>

              <p>
                {
                  ingredients[
                    activeIngredient
                  ].description
                }
              </p>

              <div className="ingredient-selector">

                {ingredients.map(
                  (
                    ingredient,
                    index
                  ) => (
                    <button
                      key={
                        ingredient.id
                      }
                      className={
                        activeIngredient ===
                        index
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setActiveIngredient(
                          index
                        )
                      }
                    >
                      {
                        ingredient.id
                      }
                    </button>
                  )
                )}

              </div>

            </article>

          </div>

        </section>

        {/* ===================================================
            03 SPLIT MENU
            FRAMES 096 - 135
        ==================================================== */}

        <section
          className="split-menu-section cinematic-surface"
          id="menu"
        >

          <div className="split-menu">

            {/* LEFT VISUAL */}

            <div className="menu-visual">

              <div className="menu-visual-label">

                <span>
                  03 / MENU
                </span>

                <strong>
                  MADE
                  <br />
                  TO
                  <em> CRAVE.</em>
                </strong>

              </div>

              <div className="visual-frame-index">
                03
              </div>

            </div>

            {/* RIGHT INTERFACE */}

            <div className="menu-interface">
          <div className="menu-kinetic-rail" aria-hidden="true">
            <span>BURGERS</span><i>•</i><span>WRAPS</span><i>•</i><span>PIZZA</span><i>•</i><span>SIDES</span><i>•</i><span>SHAKES</span>
          </div>

              <header>

                <div>

                  <span className="eyebrow">
                    MENU EXPLORER
                  </span>

                  <h2>
                    PICK
                    <em> YOURS.</em>
                  </h2>

                </div>

                <span className="frontend-tag">
                  INTERACTIVE /
                  FRONTEND
                </span>

              </header>

              {/* SEARCH + DIET FILTER */}

              <div className="menu-tools">
                <label className="menu-search">
                  <span>SEARCH MENU</span>
                  <input
                    type="search"
                    value={menuSearch}
                    placeholder="Burger, wrap, wings..."
                    onChange={(event) => {
                      setMenuSearch(event.target.value);
                      setMenuIndex(0);
                    }}
                  />
                </label>

                <div className="diet-filter" aria-label="Diet filter">
                  {["ALL", "VEG", "NON-VEG"].map((filter) => (
                    <button
                      key={filter}
                      className={dietFilter === filter ? "active" : ""}
                      onClick={() => {
                        setDietFilter(filter);
                        setMenuIndex(0);
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* CATEGORY */}

              <div className="category-tabs">

                {Object.keys(
                  menu
                ).map(
                  (category) => (
                    <button
                      key={
                        category
                      }
                      className={
                        menuCategory ===
                        category
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        chooseCategory(
                          category
                        )
                      }
                    >
                      {category}

                      <span>
                        {
                          menu[
                            category
                          ].length
                        }
                      </span>

                    </button>
                  )
                )}

              </div>

              {/* ITEM LIST */}

              <div className="menu-items">

                {selectedMenu.length ? selectedMenu.map(
                  (item, index) => (
                    <button
                      key={item.name}
                      className={menuIndex === index ? "active" : ""}
                      onClick={() => setMenuIndex(index)}
                    >
                      <span>{item.id}</span>
                      <div>
                        <strong>{item.name}</strong>
                        <small>{item.veg ? "● VEG" : "▲ NON-VEG"} · {item.tag}</small>
                      </div>
                      <b>₹{item.price}</b>
                      <i>↗</i>
                    </button>
                  )
                ) : (
                  <div className="menu-empty">
                    <strong>NO MATCH FOUND</strong>
                    <span>Try another category, diet filter or search term.</span>
                  </div>
                )}

              </div>

              {/* CURRENT ITEM */}

              {selectedItem && (
              <article className="selected-menu-item">

                <div className="selected-number">
                  {
                    selectedItem.id
                  }
                </div>

                <span>
                  CURRENT SELECTION
                </span>

                <h3>
                  {
                    selectedItem.name
                  }
                </h3>

                <p>
                  {
                    selectedItem.description
                  }
                </p>

                <div className="menu-note">
                  {
                    selectedItem.note
                  }
                </div>

                <div className="heat-level">

                  <small>
                    HEAT
                  </small>

                  {[1, 2, 3].map(
                    (level) => (
                      <i
                        key={
                          level
                        }
                        className={
                          level <=
                          selectedItem.heat
                            ? "active"
                            : ""
                        }
                      />
                    )
                  )}

                </div>

                <footer>

                  <strong>
                    ₹
                    {
                      selectedItem.price
                    }
                  </strong>

                  <button
                    className={`save-button ${
                      favourites.includes(
                        selectedItem.name
                      )
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleFavourite(
                        selectedItem.name
                      )
                    }
                  >
                    {favourites.includes(
                      selectedItem.name
                    )
                      ? "♥ SAVED"
                      : "♡ SAVE"}
                  </button>

                  <div className="menu-navigation">

                    <button
                      onClick={
                        previousMenu
                      }
                    >
                      ←
                    </button>

                    <span>
                      {menuIndex + 1}
                      {" / "}
                      {
                        selectedMenu.length
                      }
                    </span>

                    <button
                      onClick={
                        nextMenu
                      }
                    >
                      →
                    </button>

                  </div>

                </footer>

              </article>
              )}

            </div>

          </div>

        </section>

        {/* ===================================================
            04 BURGER LAB
            FRAMES 136 - 185
        ==================================================== */}

        <section
          className="burger-lab"
          id="builder"
        >

          <div className="lab-sticky">

            <header
              className="lab-heading"
              data-reveal
            >

              <span className="eyebrow">
                04 / BURGER LAB
              </span>

              <h2>
                BUILD
                <em> YOURS.</em>
              </h2>

              <p>
                Choose your build.
                The cinematic stage
                responds to your
                selections.
              </p>

            </header>

            {/* LEFT CONTROL */}

            <div className="lab-controls">

              {buildOptions.map(
                (
                  group,
                  groupIndex
                ) => (
                  <article
                    key={
                      group.title
                    }
                    className="lab-control-group"
                  >

                    <header>

                      <span>
                        {
                          group.id
                        }
                      </span>

                      <strong>
                        {
                          group.title
                        }
                      </strong>

                    </header>

                    <div>

                      {group.options.map(
                        (
                          option,
                          optionIndex
                        ) => (
                          <button
                            key={
                              option.name
                            }
                            className={
                              builder[
                                groupIndex
                              ] ===
                              optionIndex
                                ? "active"
                                : ""
                            }
                            onClick={() =>
                              chooseBuilder(
                                groupIndex,
                                optionIndex
                              )
                            }
                          >

                            <span>
                              {
                                option.name
                              }
                            </span>

                            <b>
                              {option.price ===
                              0
                                ? "INCLUDED"
                                : `+₹${option.price}`}
                            </b>

                            <i />

                          </button>
                        )
                      )}

                    </div>

                  </article>
                )
              )}

            </div>

            {/* RIGHT SUMMARY */}

            <aside className="lab-summary">

              <span>
                YOUR BUILD
              </span>

              <div className="lab-big-number">
                BT
              </div>

              <h3>
                CUSTOM
                <br />
                SMASH
              </h3>

              <div className="build-result">

                {buildOptions.map(
                  (
                    group,
                    index
                  ) => (
                    <div
                      key={
                        group.title
                      }
                    >

                      <small>
                        {
                          group.title
                        }
                      </small>

                      <strong>
                        {
                          group
                            .options[
                            builder[
                              index
                            ]
                          ].name
                        }
                      </strong>

                    </div>
                  )
                )}

              </div>

              <div className="lab-price">

                <small>
                  ESTIMATED MENU PRICE
                </small>

                <strong>
                  ₹
                  {
                    builderPrice
                  }
                </strong>

              </div>

              <p>
                Interactive preview
                only. No order is
                placed.
              </p>

            </aside>

            <div className="lab-center-marker">

              <span>
                360°
              </span>

              <small>
                CINEMATIC BUILD
              </small>

            </div>

          </div>

        </section>

        {/* ===================================================
            05 FLAVOUR FINDER
        ==================================================== */}

        <section
          className="finder-section cinematic-surface"
          id="finder"
        >

          <div
            className="finder-heading"
            data-reveal
          >

            <span className="eyebrow">
              05 / FLAVOUR FINDER
            </span>

            <h2>
              WHAT ARE
              <br />
              YOU
              <em> FEELING?</em>
            </h2>

            <p>
              Pick a mood.
              We'll point you toward
              the burger.
            </p>

          </div>

          <div
            className="finder-interface"
            data-reveal
          >

            <div className="finder-options">

              {flavourFinder.map(
                (option) => (
                  <button
                    key={
                      option.mood
                    }
                    className={
                      finderResult
                        ?.mood ===
                      option.mood
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setFinderResult(
                        option
                      )
                    }
                  >

                    <small>
                      I WANT
                    </small>

                    <strong>
                      {
                        option.mood
                      }
                    </strong>

                    <span>
                      +
                    </span>

                  </button>
                )
              )}

            </div>

            <article className="finder-result">

              {finderResult ? (
                <>

                  <small>
                    YOUR MATCH
                  </small>

                  <h3>
                    {
                      finderResult.burger
                    }
                  </h3>

                  <p>
                    {
                      finderResult.detail
                    }
                  </p>

                  <a href="#menu">
                    FIND IN MENU
                    <span>→</span>
                  </a>

                </>
              ) : (
                <>

                  <small>
                    WAITING FOR INPUT
                  </small>

                  <h3>
                    PICK A
                    <br />
                    MOOD.
                  </h3>

                </>
              )}

            </article>

          </div>

        </section>

        {/* ===================================================
            06 STORY CINEMA
            FRAMES 186 - 215
        ==================================================== */}

        <section
          className="story-cinema"
          id="story"
        >

          <div className="story-sticky">

            <div
              className="story-content"
              data-reveal
            >

              <span className="eyebrow">
                06 / BURGER TIME
              </span>

              <h2>
                LESS
                <br />
                TALK.
                <br />
                <em>
                  MORE
                  <br />
                  CRUST.
                </em>
              </h2>

              <div className="story-text">

                <p>
                  Burger Time is built
                  around a simple idea:
                  do the fundamentals
                  properly.
                </p>

                <p>
                  Hot surfaces.
                  Proper caramelisation.
                  Balanced sauces.
                  Great texture.
                </p>

              </div>

              <div className="story-stats">

                <div>
                  <strong>
                    100%
                  </strong>

                  <span>
                    COOKED TO ORDER
                  </span>
                </div>

                <div>
                  <strong>
                    03
                  </strong>

                  <span>
                    HEAT LEVELS
                  </span>
                </div>

                <div>
                  <strong>
                    ∞
                  </strong>

                  <span>
                    CUSTOM BUILDS
                  </span>
                </div>

              </div>

            </div>

            <div className="story-side-word">
              BURGER TIME
            </div>

          </div>

        </section>

        {/* ===================================================
            07 REVIEWS
        ==================================================== */}

        <section
          className="reviews-section cinematic-surface"
          id="reviews"
        >

          <header
            data-reveal
            className="reviews-heading"
          >

            <span className="eyebrow">
              07 / WORD ON THE STREET
            </span>

            <h2>
              PEOPLE
              <br />
              <em>
                TALK.
              </em>
            </h2>

          </header>

          <div
            className="review-interface"
            data-reveal
          >

            <div className="review-rating">

              <small>
                RATING
              </small>

              <strong>
                {
                  reviews[
                    reviewIndex
                  ].rating
                }
              </strong>

              <span>
                / 5.0
              </span>

            </div>

            <article>

              <div className="quote">
                “
              </div>

              <blockquote>
                {
                  reviews[
                    reviewIndex
                  ].quote
                }
              </blockquote>

              <footer>

                <div>

                  <strong>
                    {
                      reviews[
                        reviewIndex
                      ].name
                    }
                  </strong>

                  <span>
                    {
                      reviews[
                        reviewIndex
                      ].location
                    }
                  </span>

                </div>

                <div className="review-navigation">

                  <button
                    onClick={() =>
                      setReviewIndex(
                        (
                          reviewIndex -
                          1 +
                          reviews.length
                        ) %
                          reviews.length
                      )
                    }
                  >
                    ←
                  </button>

                  <span>
                    {reviewIndex + 1}
                    {" / "}
                    {reviews.length}
                  </span>

                  <button
                    onClick={() =>
                      setReviewIndex(
                        (
                          reviewIndex +
                          1
                        ) %
                          reviews.length
                      )
                    }
                  >
                    →
                  </button>

                </div>

              </footer>

            </article>

          </div>

        </section>

        {/* ===================================================
            08 FAQ
        ==================================================== */}

        <section
          className="faq-section cinematic-surface"
          id="faq"
        >

          <header
            data-reveal
            className="faq-heading"
          >

            <span className="eyebrow">
              08 / GOOD TO KNOW
            </span>

            <h2>
              QUICK
              <br />
              <em>
                ANSWERS.
              </em>
            </h2>

          </header>

          <div
            className="faq-list"
            data-reveal
          >

            {faqs.map(
              (
                faq,
                index
              ) => (
                <article
                  key={
                    faq.question
                  }
                  className={
                    faqOpen ===
                    index
                      ? "open"
                      : ""
                  }
                >

                  <button
                    onClick={() =>
                      setFaqOpen(
                        faqOpen ===
                          index
                          ? null
                          : index
                      )
                    }
                  >

                    <span>
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <strong>
                      {
                        faq.question
                      }
                    </strong>

                    <i>
                      +
                    </i>

                  </button>

                  <div className="faq-answer">

                    <p>
                      {
                        faq.answer
                      }
                    </p>

                  </div>

                </article>
              )
            )}

          </div>

        </section>

        {/* ===================================================
            09 FINAL CINEMA
            FRAMES 216 - 239
        ==================================================== */}

        <section
          className="finale-section"
          id="finale"
        >

          <div className="finale-sticky">

            <div
              className="finale-content"
              data-reveal
            >

              <span>
                BURGER TIME /
                FINAL BUILD
              </span>

              <h2>
                COME
                <br />
                <em>
                  HUNGRY.
                </em>
              </h2>

              <p>
                The menu is digital.
                <br />
                The burger is very real.
              </p>

              <a href="#menu">
                EXPLORE THE MENU

                <span>
                  ↑
                </span>
              </a>

            </div>

            <div className="finale-brand">

              <strong>
                BURGER
                <em> TIME</em>
              </strong>

              <span>
                SMASHED WITH INTENT.
              </span>

            </div>

          </div>

        </section>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <footer className="site-footer">

          <div>

            <strong>
              BURGER
              <em> TIME</em>
            </strong>

            <span>
              FRONTEND CINEMATIC
              EXPERIENCE
            </span>

          </div>

          <div className="footer-live">
            <i />

            INTERACTIVE /
            FRONTEND ONLY
          </div>

          <a href="#home">
            BACK TO TOP
            <span>↑</span>
          </a>

        </footer>

      </main>

    </div>
  );
}