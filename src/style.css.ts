import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  backgroundColor: '#fff',
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const box = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  borderRadius: '24px',
  gap: '8px',
  backgroundColor: '#F3F4F5',
  marginBottom: '1rem',
});

const row = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  borderRadius: '24px',
  border: '2px solid #F3F4F5',
  padding: '1rem',
});

const img = style({
  objectFit: 'cover',
  marginBottom: '-16px',
  objectPosition: 'top',
  marginTop: '8px',
});

const textTitle = style({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  alignItems: 'center',
  marginTop: '1rem',
  gap: '8px',
});

const numbersContainer = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
});

const numberContaier = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '63px',
    height: '72px',
    borderRadius: '24px',
  },
  variants: {
    selected: {
      true: {
        backgroundColor: '#FFDCD3',
      },
      false: {
        backgroundColor: '#F3F4F5',
      },
    },
  },
});

const hr = style({
  width: '200px',
  height: '2px',
  background: 'linear-gradient(90deg, rgba(243, 244, 245, 0) 0%, rgba(243, 244, 245, 1) 50%, rgba(243, 244, 245, 0) 100%)',
  margin: '0 auto',
});

const wrap = style({
  maskImage: 'linear-gradient(to bottom,transparent,black 115px,black calc(100% - 115px),transparent)',
  WebkitMaskImage: 'linear-gradient(to bottom,transparent,black 115px,black calc(100% - 115px),transparent)',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});

const wrap2 = style({
  border: '4px solid #FFDCD3',
  borderRadius: '8px',
  marginTop: '1rem',
  padding: '0 .25rem',
});

const swSlide = style({
  width: '276px',
});

export const appSt = {
  bottomBtn,
  container,
  box,
  row,
  img,
  textTitle,
  numbersContainer,
  numberContaier,
  hr,
  wrap,
  swSlide,
  wrap2,
};
