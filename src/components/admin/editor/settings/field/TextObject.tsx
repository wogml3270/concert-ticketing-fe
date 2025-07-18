import React from 'react';
import * as fabric from 'fabric';

import styles from './field.module.css';

interface TextObjectProps {
  selectedObject: fabric.Object | null;
  text: Record<
    string,
    {
      text: string;
      fontSize: number;
    }
  >;
  setText: React.Dispatch<
    React.SetStateAction<
      Record<
        string,
        {
          text: string;
          fontSize: number;
        }
      >
    >
  >;
  isLocked: boolean;
  canvas: fabric.Canvas;
}

export function TextObject({
  selectedObject,
  text,
  setText,
  isLocked,
  canvas,
}: TextObjectProps) {
  // 텍스트 내용
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === 'i-text') {
      const id = activeObject.id as string;
      setText((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          text: value,
        },
      }));
      activeObject.set('text', value);
      canvas.requestRenderAll();
    }
  };

  // 글자 크기
  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const intValue = parseInt(value, 10);
    const activeObject = canvas.getActiveObject();

    if (activeObject && activeObject.type === 'i-text' && intValue > 0) {
      const id = activeObject.id as string;
      setText((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          fontSize: intValue,
        },
      }));
      activeObject.set('fontSize', intValue);
      canvas.requestRenderAll();
    }
  };

  if (!selectedObject || selectedObject.type !== 'i-text') {
    return null;
  }

  const id = selectedObject.id as string;

  return (
    <div className={styles.container}>
      <div className={styles.field}>
        <label className={styles.label}>텍스트 내용</label>
        <textarea
          value={text[id]?.text || ''}
          className={styles.textarea}
          onClick={(e) => e.currentTarget.select()}
          onChange={handleTextChange}
          placeholder='텍스트를 입력하세요...'
          disabled={isLocked}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>글자 크기</label>
        <input
          type='number'
          value={text[id]?.fontSize || ''}
          className={`${styles.input} ${styles.numberInput}`}
          onClick={(e) => e.currentTarget.select()}
          onChange={handleFontSizeChange}
          placeholder='글자 크기 입력'
          disabled={isLocked}
        />
      </div>
    </div>
  );
}
