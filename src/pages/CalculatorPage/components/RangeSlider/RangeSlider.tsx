// src/components/RangeSlider/RangeSlider.tsx
import React from 'react';
import styles from './RangeSlider.module.scss';
import { formatNumber } from '@/lib/formatNumber/formatNumber';

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
  unit?: string;
  labelMin: string;
  labelMax: string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  value,
  onChange,
  labelMin,
  labelMax,
  label,
  unit = ''
}) => {
  const getSliderStyle = (min: number, max: number, value: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(90deg, #5BD000 0%, #5BD000 ${percentage}%, #FFFFFF ${percentage}%, #FFFFFF 100%)`,
    };
  };

  const formattedSum = formatNumber(value);

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderTitle}>
        <p>{label}</p>
        <span>{formattedSum} {unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.slider}
        style={getSliderStyle(min, max, value)}
      />
      <div className={styles.sliderValues}>
        <p>{labelMin}</p>
        <p>{labelMax}</p>
      </div>
    </div>
  );
};
