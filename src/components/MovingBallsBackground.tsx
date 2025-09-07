"use client";

import { useTheme } from '../context/ThemeContext'; // Import useTheme

const MovingBallsBackground: React.FC = () => {
  const { theme } = useTheme(); // Get current theme

  // Define animation properties for each ball, with light and dark mode variations
  const ballData = [
    { top: '77%', left: '88%', duration: '40s', delay: '-3s', originLight: '16vw -2vh', originDark: '10vw 5vh', shadowLight: '40vmin 0 5.7vmin currentColor', shadowDark: '30vmin 0 4vmin currentColor' },
    { top: '42%', left: '2%', duration: '53s', delay: '-29s', originLight: '-19vw 21vh', originDark: '-15vw 15vh', shadowLight: '-40vmin 0 5.1vmin currentColor', shadowDark: '-30vmin 0 3.5vmin currentColor' },
    { top: '28%', left: '18%', duration: '49s', delay: '-8s', originLight: '-22vw 3vh', originDark: '-18vw 8vh', shadowLight: '40vmin 0 5.2vmin currentColor', shadowDark: '30vmin 0 3.8vmin currentColor' },
    { top: '50%', left: '79%', duration: '26s', delay: '-21s', originLight: '-17vw -6vh', originDark: '-12vw -2vh', shadowLight: '40vmin 0 5.2vmin currentColor', shadowDark: '30vmin 0 3.9vmin currentColor' },
    { top: '46%', left: '15%', duration: '36s', delay: '-40s', originLight: '4vw 0vh', originDark: '8vw 5vh', shadowLight: '-40vmin 0 5.9vmin currentColor', shadowDark: '-30vmin 0 4.2vmin currentColor' },
    { top: '77%', left: '16%', duration: '31s', delay: '-10s', originLight: '18vw 4vh', originDark: '14vw 9vh', shadowLight: '40vmin 0 5.1vmin currentColor', shadowDark: '30vmin 0 3.7vmin currentColor' },
    { top: '22%', left: '17%', duration: '55s', delay: '-6s', originLight: '1vw -23vh', originDark: '5vw -18vh', shadowLight: '-40vmin 0 5.7vmin currentColor', shadowDark: '-30vmin 0 4.1vmin currentColor' },
    { top: '41%', left: '47%', duration: '43s', delay: '-28s', originLight: '25vw -3vh', originDark: '20vw 2vh', shadowLight: '40vmin 0 5.1vmin currentColor', shadowDark: '30vmin 0 3.6vmin currentColor' },
  ];

  return (
    <div className="background">
      {ballData.map((ball, i) => (
        <div
          key={i}
          className="ball"
          style={{
            top: ball.top,
            left: ball.left,
            animationDuration: ball.duration,
            animationDelay: ball.delay,
            transformOrigin: theme === 'dark' ? ball.originDark : ball.originLight,
            boxShadow: theme === 'dark' ? ball.shadowDark : ball.shadowLight,
          }}
        />
      ))}
    </div>
  );
};

export default MovingBallsBackground;