const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const plugin = require('tailwindcss/plugin');
const btnPlugins = require('./src/core/plugins/components/btn');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1320px',
      },
      padding: '1rem',
    },
    extend: {
      boxShadow: {
        'custom-double':
          '13.89px 4px 23.61px rgba(0, 0, 0, 0.25), -13.89px 8px 23.61px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        VideoPlayer: 'radial-gradient(#0000004d, #000000b3)',
        LeaderboardBgSvg:
          "url('../../../../shared/assets/src/Images/svgs/leaderboardBg.svg')",
        ellipse: "url('../../../../shared/assets/src/Images/svgs/Ellipse.svg')",
        chatBg:
          "url('../../../../shared/assets/src/Images/pngs/chatBackground.png')",
        KeyFeature:
          "url('../../../../shared/assets/src/Images/pngs/KeyFeature.png')",
        FooterBg:
          "url('../../../../shared/assets/src/Images/pngs/FooterBg.png')",
        Testimonials:
          "url('../../../../shared/assets/src/Images/pngs/TestimonialsBg.png')",
      },
      colors: {
        FFCC18: '#FFCC18',
        darkSilver: '#707070',
        F4FFFF: '#F4FFFF',
        CCCCCC: '#CCCCCC',
        darkBlue: '#394F89',
        D9DBDB: '#D9DBDB',
        darkGray495555: '#495555',
        darkGray4D4D4D: '#4D4D4D',
        darkGray666666: '#666666',
        F8FAFF: '#F8FAFF',
        lightGreyF8F8F8: '#F8F8F8',
        lightGreyF4F4F4: '#F4F4F4',
        LIGHT_BLUE_3EB6FF: '#3EB6FF',
        LIGHT_BLUE_D4EDF7: '#D4EDF7',
        GREY_A2A2A2: '#A2A2A2',
        GREY_797979: '#797979',
        GREY_A1A6A3: '#A1A6A3',
        GREY_808080: '#808080',
        VIOLET_696CC3: '#696CC3',
        LIGHT_GREY_B0B0B0: '#B0B0B0',
        LIGHT_BLUE_E8F1FF: '#E8F1FF',
        LIGHT_BLUE_6F73CE: '#6F73CE',
        DARK_BLUE_383A68: '#383A68',
        DARK_BLUE_0C3896: '#0C3896',
        LIGHT_BLUE_E9F1FF: '#E9F1FF',
        ALICE_BLUE: '#FBFDFF',
        LIGHT_GREEN_3FC500: '#3FC500',
        LIGHT_GREEN_8CE590: '#8CE590',
        BLUE_4681FF: '#4681FF',
        BLUE_3965C2: '#3965C2',
        RED_DB3611: '#DB3611',
        RED_C62828: '#C62828',
        PINK_F18282: '#F18282',
        danger: '#f8285a',
      },
    },
    fontFamily: {
      jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
    },
    custom: ({ theme }) => ({
      components: {
        common: {
          borderRadius: {
            btn: '18px',
          },
        },
        btn: {
          sm: {
            px: '1rem',
            py: '0.75rem',
            gap: '0.375rem',
            fontSize: '0.8125rem',
            fontWeight: '500',
          },
          DEFAULT: {
            px: '1.25rem',
            py: '1rem',
            gap: '0.375rem',
            fontSize: '18px',
            fontWeight: theme('fontWeight.semibold'),
          },
          lg: {
            px: '1.25rem',
            py: '0.75rem',
            gap: '0.5rem',
            fontSize: theme('fontSize.sm'),
            fontWeight: '500',
          },
        },
        btnColor: {
          blue: {
            color: theme('colors.white'),
            background: '#394f89',
            outline: {
              color: '#0c3896',
            },
          },
          purple: {
            color: theme('colors.white'),
            background: `linear-gradient(to bottom, #383a68 , #6f73ce)`,
            outline: {
              color: '#4b4e8b',
              borderColor: '#4b4e8b',
            },
          },
          'dark-gray': {
            color: theme('colors.white'),
            background: `linear-gradient(to bottom, #B1BED4 , #4B5F83)`,
            outline: {
              color: '#4d4d4d',
              borderColor: '#4d4d4d',
            },
          },
          pink: {
            color: theme('colors.white'),
            background: '#FF69B4',
          },
          danger: {
            color: theme('colors.white'),
            background: theme('colors.danger'),
          },
        },
      },
    }),
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
    btnPlugins,
    require('@tailwindcss/typography'),
  ],
};
