const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");

module.exports = {
  purge: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      margin: {
        "5em": "5em",
      },
      linearBorderGradients: {
        directions: {
          tr: "to top right",
          r: "to right",
          t: "to top",
          b: "to bottom",
        },
        colors: {
          "blue-pink": ["#27B0E6", "#FA52A0"],
          "pink-red-light-brown": ["#FE5A75", "#FEC464"],
          "purple-blue": ["#462CA9", "#2517FF"],
          "blue-green": ["#2517FF", "#15F195"],
        },
        background: {
          "dark-1000": "#0D0415",
          "dark-900": "#161522",
          "dark-800": "#202231",
          "dark-pink-red": "#4e3034",
        },
        border: {
          1: "1px",
          2: "2px",
          3: "3px",
          4: "4px",
        },
      },
      backgroundImage: {
        "marketplace-section": "url(/img/leaves.png)",
        "nft-gradient":
          "linear-gradient(180deg, #2517FF -61.88%, #15F195 131.19%)",
        "leader-board": "linear-gradient(180deg, #4B31AC 0%, #2703F8 100%)",
        "button-gradient":
          " linear-gradient(269.71deg, #3C49D5 -46.63%, #00D9AC 152.6%)",
        "button-hover-gradient":
          " linear-gradient(269.71deg, #3C49D597 -46.63%, #00D9AC 152.6%)",
      },
      colors: {
        purple: "#462CA9",
        purple100: "#8C4FF8;",
        grey: "#777E91",
        grey100: "#F7F8FC",
        pink: "#f338c3",
        red: "crimson",
        yellow: "#ffd166",
        green: "#1EE9B6",
        black: "#1F2030",
        "deep-gray": "#23262F",
        muted: "#777E91",
        "dark-pink": "#EF466F",
        orange: "#FF592C",
        "dark-blue": "#020F2C",
        "butter-white": "#FCFCFD",
        dark: "#000",
        steel: "#797979",

        "dark-gray": "#6D7278",
        "grey-400": "#878787",
        "grey-300": "#353945",
        "grey-50": "#7A7585",
        "grey-80": "#3C3844",
        "trading-history": "#1F2126",
        "trading-history-border-b": "#E6E8EC",
        "nft-card-border": "#A67CED",

        green: "#14F195",
        black: "#000000",
        black100: "#1F2030",
        black200: "#292A3E",
        white: "#ffffff",
        dark: "#000E48",
        dark1: "#02061D",
        dark2: "#1B1C20",
        dark3: "#212121",
        dark4: "#4A4A4A",
        grey: "#FBFDFF",
        grey1: "#F4F4F4",
        grey5: "#A0A5BA",
        grey6: "#6B6B6B",
        lightGreen: "#00D9AC20",
        accent: "#174AFF",
        accent1: "#F2F8FF",
      },
      lineHeight: {
        "48px": "48px",
      },
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
        outfit: ["Outfit", "sans-serif"],
        work_sans: ["Work Sans", "sans-serif"],
      },
      fontSize: {
        label: [
          "12px",
          {
            fontWeight: "bold",
          },
        ],
        hero: [
          "48px",
          {
            letterSpacing: "-0.02em;",
            lineHeight: "96px",
            fontWeight: 700,
          },
        ],
      },
      borderRadius: {
        none: "0",
        px: "1px",
        DEFAULT: "0.625rem",
      },
      boxShadow: {
        swap: "0px 50px 250px -47px rgba(39, 176, 230, 0.29)",
        liquidity: "0px 50px 250px -47px rgba(123, 97, 255, 0.23)",
        "pink-glow": "0px 57px 90px -47px rgba(250, 82, 160, 0.15)",
        "blue-glow": "0px 57px 90px -47px rgba(39, 176, 230, 0.17)",
        "pink-glow-hovered": "0px 57px 90px -47px rgba(250, 82, 160, 0.30)",
        "blue-glow-hovered": "0px 57px 90px -47px rgba(39, 176, 230, 0.34)",
        migrator: " 0px 0px 40px rgba(48, 73, 191, 0.05)",
        faq: "0px 0px 40px rgba(48, 73, 191, 0.05)",
      },
      ringWidth: {
        DEFAULT: "1px",
      },
      padding: {
        px: "1px",
        "3px": "3px",
      },
      minHeight: {
        5: "1.25rem",
        empty: "128px",
        cardContent: "230px",
        fitContent: "fit-content",
        nftContainer: "503px",
      },
      minWidth: {
        5: "1.25rem",
      },
      maxWidth: {
        22: "22.06rem",
      },
      dropShadow: {
        currencyLogo: "0px 3px 6px rgba(15, 15, 15, 0.25)",
      },
      screens: {
        "3xl": "1600px",
      },
      animation: {
        ellipsis: "ellipsis 1.25s infinite",
        "spin-slow": "spin 2s linear infinite",
        fade: "opacity 150ms linear",
      },
      keyframes: {
        ellipsis: {
          "0%": { content: '"."' },
          "33%": { content: '".."' },
          "66%": { content: '"..."' },
        },
        opacity: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },
      zIndex: {
        999: "999",
      },
    },
  },
  variants: {
    linearBorderGradients: ["responsive", "hover", "dark"], // defaults to ['responsive']
    extend: {
      backgroundColor: ["checked", "disabled"],
      backgroundImage: ["hover", "focus"],
      borderColor: ["checked", "disabled"],
      cursor: ["disabled"],
      opacity: ["hover", "disabled"],
      placeholderColor: ["hover", "active"],
      ringWidth: ["disabled"],
      ringColor: ["disabled"],
    },
  },
  plugins: [
    // require('tailwindcss-border-gradient-radius'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".header-border-b": {
          background:
            "linear-gradient(to right, rgba(39, 176, 230, 0.2) 0%, rgba(250, 82, 160, 0.2) 100%) left bottom no-repeat",
          backgroundSize: "100% 1px",
        },
      });
    }),
  ],
};
