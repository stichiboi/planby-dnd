import React, { useMemo, useState } from "react";
import { Epg, Layout, useEpg } from "../../Epg";
import { ChannelEpg, randomDate } from "../utils";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem";
import { DroppableContainer } from "./DroppableContainer";
import { useCollisionDetectionStrategy } from "./sortingStrategy";

interface DragAndDropProps {
  data: ChannelEpg[]
}

export type Items = Record<UniqueIdentifier, { id: UniqueIdentifier }[]>;

export function DragAndDrop({ data }: DragAndDropProps): JSX.Element {
  const { epg, channels } = useMemo(() => {
    return {
      epg: data.flatMap(({ programs }) => programs),
      channels: data.map(({ channel }) => channel)
    }
  }, [data]);

  const items = useMemo<Items>(() => {
    const items: Items = {};
    data.forEach(({ channel, programs }) => {
      items[channel.uuid] = programs;
    });
    return items;
  }, [epg, channels]);

  const { getEpgProps, getLayoutProps } = useEpg({
    epg,
    channels,
    startDate: randomDate(0)
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const collisionDetection = useCollisionDetectionStrategy(activeId, items);

  return (
    <Epg {...getEpgProps()}>
      <DndContext
        collisionDetection={collisionDetection}
        sensors={sensors}
        onDragStart={({ active }) => {
          setActiveId(active.id);
        }}
        onDragEnd={() => setActiveId(null)}
      >
        <Layout
          {...getLayoutProps()}
          renderProgramWrapper={
            ({ channel, children }) => {
              return (
                <DroppableContainer id={channel.uuid}>
                  <SortableContext
                    items={epg.filter(program => program.channelUuid === channel.uuid)}
                    strategy={horizontalListSortingStrategy}
                  >
                    {children}
                  </SortableContext>
                </DroppableContainer>
              );
            }
          }
          renderProgram={
            ({ program, ...rest }) => {
              return (
                <SortableItem
                  key={program.data.id}
                  program={program}
                  {...rest}
                />
              );
            }
          }
        />
      </DndContext>
    </Epg>
  );
}