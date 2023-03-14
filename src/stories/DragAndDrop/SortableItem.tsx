import React, { useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ProgramBox,
  ProgramContent,
  ProgramFlex,
  ProgramImage,
  ProgramItem,
  ProgramStack,
  ProgramText,
  ProgramTitle,
  useProgram
} from "../../Epg";

export function SortableItem({ program, ...rest }: ProgramItem): JSX.Element {
  const { styles, formatTime, isLive, isMinWidth } = useProgram({
    program,
    ...rest
  });

  const { data } = program;
  const { image, title, since, till } = data;

  const sinceTime = formatTime(since);
  const tillTime = formatTime(till);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: data.id
  });

  if (transform?.scaleX) {
    // otherwise moving the item will make it get the duration-size of the overlapped component, deforming the text completely
    transform.scaleX = 1;
  }

  const content = useMemo(
    () => (
      <ProgramContent width={styles.width} isLive={isLive}>
        <ProgramFlex>
          {isLive && isMinWidth && <ProgramImage src={image} alt="Preview"/>}
          <ProgramStack>
            <ProgramTitle>{title}</ProgramTitle>
            <ProgramText>
              {sinceTime} - {tillTime}
            </ProgramText>
          </ProgramStack>
        </ProgramFlex>
      </ProgramContent>
    ),
    [
      image,
      isLive,
      isMinWidth,
      program.data.since,
      program.data.till,
      sinceTime,
      styles.width,
      tillTime,
      title
    ]
  );

  return (
    <ProgramBox
      width={styles.width}
      style={{
        ...styles.position,
        transform: CSS.Transform.toString(transform),
        transition
      }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {content}
    </ProgramBox>
  );
}
