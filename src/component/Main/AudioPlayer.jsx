// // import { useRef, useEffect, useState } from 'react';
// // import WaveSurfer from 'wavesurfer.js';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import {
// //   faPlay,
// //   faPause,
// //   faVolumeUp,
// //   faVolumeDown,
// //   faVolumeMute,
// //   faVolumeOff,
// // } from '@fortawesome/free-solid-svg-icons';

// // const formWaveSurferOptions = (ref) => ({
// //   container: ref,
// //   waveColor: '#ccc',
// //   progressColor: 'transparent',
// //   responsive: true,
// //   height: 80,
// //   normalize: true,
// //   backend: 'WebAudio',
// //   barWidth: 2,
// //   barGap: 3,
// // });

// // function formatTime(seconds) {
// //   let date = new Date(0);
// //   date.setSeconds(seconds);
// //   return date.toISOString().substr(11, 8);
// // }

// // export function AudioPlayer({ audioFile }) {
// //   console.log('Компонент AudioPlayer отрендерился');
// //   const waveformRef = useRef(null);
// //   const wavesurferRef = useRef(null);
// //   const [playing, setPlaying] = useState(false);
// //   const [volume, setVolume] = useState(0.5);
// //   const [muted, setMuted] = useState(false);
// //   const [duration, setDuration] = useState(0);
// //   const [currentTime, setCurrentTime] = useState(0);
// //   const [audioFileName, setAudioFileName] = useState('');
// //   const [isReady, setIsReady] = useState(false);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     console.log('useEffect запустился', audioFile);
// //     if (!waveformRef.current) {
// //       console.error('waveformRef.current is null, cannot create WaveSurfer');
// //       setError('Failed to initialize WaveSurfer: container not found');
// //       return;
// //     }

// //     console.log('AudioPlayer received audioFile:', audioFile);

// //     if (!audioFile || typeof audioFile !== 'string') {
// //       const errorMsg = 'audioFile is invalid: must be a string URL';
// //       console.error(errorMsg, audioFile);
// //       setError(errorMsg);
// //       return;
// //     }

// //     if (!wavesurferRef.current) {
// //       console.log('Creating WaveSurfer instance');
// //       const options = formWaveSurferOptions(waveformRef.current);
// //       wavesurferRef.current = WaveSurfer.create(options);
// //     }

// //     document.addEventListener(
// //         'click',
// //         () => {
// //           if (wavesurferRef.current && wavesurferRef.current.backend.ac.state === 'suspended') {
// //             wavesurferRef.current.backend.ac.resume();
// //           }
// //         },
// //         { once: true }
// //       );

// //     const wavesurfer = wavesurferRef.current;

// //     const controller = new AbortController();
// //     const signal = controller.signal;

// //     fetch(audioFile, { signal })
// //       .then((response) => {
// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch audio: ${response.statusText}`);
// //         }
// //         return response.blob();
// //       })
// //       .then((blob) => {
// //         const url = URL.createObjectURL(blob);
// //         console.log('Loading audio file into WaveSurfer:', url);
// //         wavesurfer.load(url);

// //         wavesurfer.on('ready', () => {
// //           console.log('WaveSurfer ready, duration:', wavesurfer.getDuration());
// //           setIsReady(true);
// //           setVolume(wavesurfer.getVolume());
// //           setDuration(wavesurfer.getDuration());
// //           setAudioFileName(audioFile.split('/').pop());
// //           setError(null);
// //         });

// //         wavesurfer.on('audioprocess', () => {
// //           console.log('Audio playing, current time:', wavesurfer.getCurrentTime());
// //           setCurrentTime(wavesurfer.getCurrentTime());
// //         });

// //         wavesurfer.on('error', (error) => {
// //           console.error('WaveSurfer error:', error);
// //           setIsReady(false);
// //           setError('Failed to load audio: WaveSurfer error');
// //         });

// //         wavesurfer.on('play', () => {
// //           console.log('Playback started');
// //           setPlaying(true);
// //         });

// //         wavesurfer.on('pause', () => {
// //           console.log('Playback paused');
// //           setPlaying(false);
// //         });
// //       })
// //       .catch((error) => {
// //         if (error.name !== 'AbortError') {
// //           console.error('Error fetching audio:', error);
// //           setError(`Failed to fetch audio: ${error.message}`);
// //         }
// //       });

// //     return () => {
// //       console.log('Unmounting AudioPlayer');
// //       controller.abort();
// //       if (wavesurfer) {
// //         try {
// //           wavesurfer.stop();
// //           wavesurfer.unAll();
// //         } catch (error) {
// //           console.error('Error during WaveSurfer cleanup:', error);
// //         }
// //       }
// //     };
// //   }, [audioFile]);

// //   const handlePlayPause = () => {
// //     console.log('Нажата кнопка Play/Pause');
// //     if (!wavesurferRef.current) {
// //       console.error('WaveSurfer is not initialized');
// //       return;
// //     }
// //     if (!isReady) {
// //       console.warn('WaveSurfer is not ready yet');
// //       return;
// //     }
// //     console.log('Текущий статус воспроизведения:', playing);
// //     wavesurferRef.current.playPause();
// //   };

// //   const handleMute = () => {
// //     if (!wavesurferRef.current) {
// //       console.error('WaveSurfer is not initialized');
// //       return;
// //     }
// //     if (!isReady) {
// //       console.warn('WaveSurfer is not ready yet');
// //       return;
// //     }
// //     console.log('Mute button clicked, current muted state:', muted);
// //     setMuted(!muted);
// //     wavesurferRef.current.setVolume(muted ? volume : 0);
// //   };

// //   const handleVolumeChange = (newVolume) => {
// //     if (!wavesurferRef.current) {
// //       console.error('WaveSurfer is not initialized');
// //       return;
// //     }
// //     if (!isReady) {
// //       console.warn('WaveSurfer is not ready yet');
// //       return;
// //     }
// //     console.log('Volume changed to:', newVolume);
// //     setVolume(newVolume);
// //     wavesurferRef.current.setVolume(newVolume);
// //     setMuted(newVolume === 0);
// //   };

// //   const handleVolumeUp = () => {
// //     console.log('Volume Up button clicked');
// //     handleVolumeChange(Math.min(volume + 0.1, 1));
// //   };

// //   const handleVolumeDown = () => {
// //     console.log('Volume Down button clicked');
// //     handleVolumeChange(Math.max(volume - 0.1, 0));
// //   };

// //   return (
// //     <section>
// //       <div id='waveform' ref={waveformRef} style={{ width: '100%' }}>
// //         <div className='controls'>
// //           <button onClick={handlePlayPause} disabled={!isReady}>
// //             <FontAwesomeIcon icon={playing ? faPause : faPlay} />
// //           </button>
// //           <button onClick={handleMute} disabled={!isReady}>
// //             <FontAwesomeIcon icon={muted ? faVolumeOff : faVolumeMute} />
// //           </button>
// //           <input
// //             type='range'
// //             id='volume'
// //             name='volume'
// //             min='0'
// //             max='1'
// //             step='0.05'
// //             value={muted ? 0 : volume}
// //             onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
// //             disabled={!isReady}
// //           />
// //           <button onClick={handleVolumeDown} disabled={!isReady}>
// //             <FontAwesomeIcon icon={faVolumeDown} />
// //           </button>
// //           <button onClick={handleVolumeUp} disabled={!isReady}>
// //             <FontAwesomeIcon icon={faVolumeUp} />
// //           </button>
// //         </div>
// //         <div className='audio-info'>
// //           <span>
// //             Playing: {audioFileName}
// //             <br />
// //           </span>
// //           <span>
// //             Duration: {formatTime(duration)} | Current Time: {formatTime(currentTime)}
// //             <br />
// //           </span>
// //           <span>Volume: {Math.round(volume * 100)}%</span>
// //           <br />
// //           <span>Status: {error ? `Error: ${error}` : isReady ? 'Ready' : 'Loading...'}</span>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// import React, { useRef, useEffect, useState } from 'react';
// import WaveSurfer from 'wavesurfer.js';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlay, faPause, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

// const formWaveSurferOptions = (container) => ({
//   container,
//   waveColor: '#ccc',
//   progressColor: '#007bff',
//   responsive: true,
//   height: 80,
//   normalize: true,
//   barWidth: 2,
//   barGap: 3,
//   backend: 'WebAudio',
// });

// const AudioPlayer = ({ audioFile }) => {
//   const waveformRef = useRef(null);
//   const wavesurferRef = useRef(null);
//   const [playing, setPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [isReady, setIsReady] = useState(false);

//   useEffect(() => {
//     if (!waveformRef.current) return;

//     wavesurferRef.current = WaveSurfer.create(formWaveSurferOptions(waveformRef.current));
//     wavesurferRef.current.load(audioFile);

//     wavesurferRef.current.on('ready', () => {
//       setIsReady(true);
//       wavesurferRef.current.setVolume(volume);
//     });

//     return () => {
//       if (wavesurferRef.current) {
//         wavesurferRef.current.destroy();
//       }
//     };
//   }, [audioFile]);

//   const handlePlayPause = () => {
//     if (!isReady) return;
//     wavesurferRef.current.playPause();
//     setPlaying(!playing);
//   };

//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     wavesurferRef.current.setVolume(newVolume);
//   };

//   return (
//     <div>
//       <div ref={waveformRef} style={{ width: '100%', marginBottom: '10px' }}></div>
//       <button onClick={handlePlayPause} disabled={!isReady}>
//         <FontAwesomeIcon icon={playing ? faPause : faPlay} />
//       </button>
//       <input
//         type='range'
//         min='0'
//         max='1'
//         step='0.05'
//         value={volume}
//         onChange={handleVolumeChange}
//         disabled={!isReady}
//       />
//       <FontAwesomeIcon icon={volume > 0 ? faVolumeUp : faVolumeMute} />
//     </div>
//   );
// };

// export default AudioPlayer;

// AudioPlayer.jsx

import React from 'react';

export function AudioPlayer({ audioFile }) {
  return (
    <div className='audio-player'>
      <audio controls>
        <source src={audioFile} type='audio/mp3' />
        Ваш браузер не поддерживает элемент <code>audio</code>.
      </audio>
    </div>
  );
}
