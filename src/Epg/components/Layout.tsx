import React from "react";

// Import types
import {
  ProgramItem,
  ProgramWithPosition,
  ChannelWithPosition,
  DateTime,
  Position,
  BaseTimeFormat,
} from "../helpers/types";

// Import helpers
import { getProgramOptions, isFutureTime } from "../helpers";

// Import styles
import { EpgStyled } from "../styles";

// Import components
import { Timeline, Channels, Program, Line } from "../components";

interface RenderTimeline {
  isBaseTimeFormat: BaseTimeFormat;
  isSidebar: boolean;
  isRTL: boolean;
  sidebarWidth: number;
  hourWidth: number;
  numberOfHoursInDay: number;
  offsetStartHoursRange: number;
  dayWidth: number;
}

interface LayoutProps {
  programs: ProgramItem[];
  channels: ChannelWithPosition[];
  startDate: DateTime;
  endDate: DateTime;
  scrollY: number;
  dayWidth: number;
  hourWidth: number;
  numberOfHoursInDay: number;
  offsetStartHoursRange: number;
  sidebarWidth: number;
  itemHeight: number;
  onScroll: (
    e: React.UIEvent<HTMLDivElement, UIEvent> & { target: Element }
  ) => void;
  isRTL?: boolean;
  isBaseTimeFormat?: BaseTimeFormat;
  isSidebar?: boolean;
  isTimeline?: boolean;
  isLine?: boolean;
  isProgramVisible: (position: Position) => boolean;
  isChannelVisible: (position: Pick<Position, "top">) => boolean;
  renderProgram?: (v: {
    program: ProgramItem;
    isRTL: boolean;
    isBaseTimeFormat: BaseTimeFormat;
  }) => React.ReactNode;

  renderProgramWrapper?: (v: {
    channel: ChannelWithPosition,
    children: React.ReactNode
  }) => React.ReactNode;

  renderChannel?: (v: { channel: ChannelWithPosition }) => React.ReactNode;
  renderTimeline?: (v: RenderTimeline) => React.ReactNode;
}

const { ScrollBox, Content } = EpgStyled;

export const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (props, scrollBoxRef) => {
    const { channels, programs, startDate, endDate, scrollY } = props;
    const { dayWidth, hourWidth, sidebarWidth, itemHeight } = props;
    const { numberOfHoursInDay, offsetStartHoursRange } = props;
    const {
      isSidebar = true,
      isTimeline = true,
      isLine = true,
      isBaseTimeFormat = false,
      isRTL = false,
    } = props;

    const {
      onScroll,
      isProgramVisible,
      isChannelVisible,
      renderProgram,
      renderProgramWrapper,
      renderChannel,
      renderTimeline,
    } = props;

    const channelsLength = channels.length;
    const contentHeight = React.useMemo(() => channelsLength * itemHeight, [
      channelsLength,
      itemHeight,
    ]);
    const isFuture = isFutureTime(endDate);

    const renderPrograms = (program: ProgramWithPosition) => {
      const { position } = program;
      const isVisible = isProgramVisible(position);
      if (isVisible) {
        const options = getProgramOptions(program);
        if (renderProgram)
          return renderProgram({
            program: options,
            isRTL,
            isBaseTimeFormat,
          });
        return (
          <Program
            key={program.data.id}
            isRTL={isRTL}
            isBaseTimeFormat={isBaseTimeFormat}
            program={options}
          />
        );
      }
      return null;
    };

    const renderTopbar = () => {
      const props = {
        sidebarWidth,
        isSidebar,
        isRTL,
        dayWidth,
        numberOfHoursInDay,
      };
      const timeProps = {
        offsetStartHoursRange,
        numberOfHoursInDay,
        isBaseTimeFormat,
        hourWidth,
      };
      if (renderTimeline) {
        return renderTimeline({ ...timeProps, ...props });
      }
      return <Timeline {...timeProps} {...props} />;
    };

    return (
      <ScrollBox isRTL={isRTL} ref={scrollBoxRef} onScroll={onScroll}>
        {isLine && isFuture && (
          <Line
            dayWidth={dayWidth}
            hourWidth={hourWidth}
            sidebarWidth={sidebarWidth}
            startDate={startDate}
            endDate={endDate}
            height={contentHeight}
          />
        )}
        {isTimeline && renderTopbar()}
        {isSidebar && (
          <Channels
            isRTL={isRTL}
            isTimeline={isTimeline}
            isChannelVisible={isChannelVisible}
            sidebarWidth={sidebarWidth}
            channels={channels as ChannelWithPosition[]}
            scrollY={scrollY}
            renderChannel={renderChannel}
          />
        )}
        <Content
          data-testid="content"
          sidebarWidth={sidebarWidth}
          isSidebar={isSidebar}
          width={dayWidth}
          height={contentHeight}
        >
          {channels.map(channel => {
            const { uuid } = channel;
            const children: React.ReactNode = programs
              .filter(({ data }) => data.channelUuid === uuid)
              .map(program => renderPrograms(program as ProgramWithPosition));

            if (renderProgramWrapper) {
              return renderProgramWrapper({ channel, children });
            }
            return (
              <div key={uuid} style={{ position: "relative", height: itemHeight }}>
                {children}
              </div>
            )
          })}
        </Content>
      </ScrollBox>
    );
  }
);
