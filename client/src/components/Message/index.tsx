import { IMessageProps } from "./types";
import wave from "../../assets/img/wave-white.svg";
import play from "../../assets/img/play-white.svg";
import pause from "../../assets/img/pause-white.svg";

import styles from "./index.module.scss";

import ReadIndicator from "../ReadIndicator";
import { useEffect, useRef, useState } from "react";
import { formatTime } from "../../helpers/formatTime";
import Avatar from "../Avatar";

let currentAudio: HTMLAudioElement | null | undefined = null;

export default function Message({
  time,
  text,
  user,
  avatar,
  isMe,
  isRead,
  isTyping,
  isUnlistened,
  audio,
}: IMessageProps) {
  const audioElement = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioTime, setAudioTime] = useState("0:00");
  const [audioProgress, setAudioProgress] = useState(0);

  const toggleAudio = () => {
    const audio = audioElement.current;
    if (!audio) return;

    if (currentAudio && audio !== currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    currentAudio = audio;
    isPlaying ? audio.pause() : audio.play();
  };

  useEffect(() => {
    const audio = audioElement.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      setAudioProgress((audio.currentTime / audio.duration) * 100);
      setAudioTime(formatTime(audio.currentTime));
    };

    const handleEnd = () => {
      setIsPlaying(false);
      setAudioProgress(0);
      setAudioTime("0:00");
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnd);
    audio.addEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <div className={isTyping ? styles.messageIsTyping : styles.message}>
      <Avatar avatar={avatar} user={user} />

      <div className={styles.messageWrapper}>
        {isTyping ? (
          <div className={styles.messageTyping}>
            <div className={styles.messageTypingDot}></div>
            <div className={styles.messageTypingDot}></div>
            <div className={styles.messageTypingDot}></div>
          </div>
        ) : (
          <>
            {audio ? (
              <>
                <audio ref={audioElement} preload="auto" src={audio}></audio>
                <div
                  className={
                    isMe
                      ? `${styles.audio} ${styles.messageContent}`
                      : `${styles.audio} ${styles.messageContent} ${styles.partner}`
                  }
                >
                  <div
                    style={{ width: audioProgress + "%" }}
                    className={styles.audioProgress}
                  ></div>
                  <button className={styles.audioBtn} onClick={toggleAudio}>
                    <img src={isPlaying ? pause : play} alt="audio button" />
                  </button>
                  <img
                    className={styles.audioWave}
                    src={wave}
                    alt="audio track"
                  />
                  <time className={styles.audioTime}>{audioTime}</time>
                  {isUnlistened && <div className={styles.unlistened}></div>}
                  <div className={styles.messageInfo}>
                    <time className={styles.messageTime}>{time}</time>

                    <ReadIndicator isMe={isMe} isRead={isRead} />
                  </div>
                </div>
              </>
            ) : (
              <>
                <p
                  className={
                    isMe
                      ? styles.messageContent
                      : `${styles.messageContent} ${styles.partner}`
                  }
                >
                  {text}
                </p>
                <div className={styles.messageInfo}>
                  <time className={styles.messageTime}>{time}</time>

                  <ReadIndicator isMe={isMe} isRead={isRead} />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
