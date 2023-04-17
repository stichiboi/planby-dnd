import React, { useCallback, useMemo, useState } from 'react';
import { Epg, Layout, useEpg } from '../../Epg';
import { ChannelEpg } from '../utils';
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { horizontalListSortingStrategy, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import { DroppableContainer } from './DroppableContainer';
import { useCollisionDetectionStrategy } from './sortingStrategy';

interface DragAndDropProps {
  data: ChannelEpg[];
}

export type Items = Record<UniqueIdentifier, { id: UniqueIdentifier }[]>;

export function DragAndDrop({ data }: DragAndDropProps): JSX.Element {
  const { epg, channels } = useMemo(() => {
    return {
      epg: data.flatMap(({ programs }) => programs),
      channels: data.map(({ channel }) => channel),
    };
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
    startDate: '2023-03-12T21:16:00Z',
    dayWidth: 800,
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const collisionDetection = useCollisionDetectionStrategy(activeId, items);

  const renderProgramWrapper = useCallback(({ channel, children }) => {
    const items = epg.filter(program => program.channelUuid === channel.uuid || program.id === activeId);
    return (
      <DroppableContainer key={channel.uuid} id={channel.uuid}>
        <SortableContext
          items={items}
          strategy={horizontalListSortingStrategy}
        >
          {children}
        </SortableContext>
      </DroppableContainer>
    );
  }, [epg, activeId]);

  return (
    <Epg {...getEpgProps()}>
      <DndContext
        collisionDetection={collisionDetection}
        sensors={sensors}
        onDragStart={({ active }) => {
          setActiveId(active.id);
        }}
        onDragEnd={() => {
          setActiveId(null);
        }}
      >
        <Layout
          {...getLayoutProps()}
          renderProgramWrapper={renderProgramWrapper}
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