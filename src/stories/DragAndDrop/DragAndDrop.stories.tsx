import { ComponentMeta, ComponentStory } from "@storybook/react";
import React, { ComponentProps } from "react";
import { fixedData } from "../utils";
import { DragAndDrop } from "./DragAndDrop";

export default {
  component: DragAndDrop,
} as ComponentMeta<typeof DragAndDrop>;


const Template: ComponentStory<ComponentProps<any>> = (args) => <DragAndDrop {...args}/>

export const Default = Template.bind({});
Default.args = {
  data: fixedData
}