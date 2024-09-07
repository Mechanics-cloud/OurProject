import { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";


const meta: Meta <typeof Button> = {
  component: Button,
} 

export default meta
type Story = StoryObj<typeof meta>;


export const Primary: Story = {
  args: {
    children: 'Button',
    onClick: ()=>alert("hello"),
    title: "Click to alert hello"
  },
}

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant:"secondary",
    
  },
}

export const Outline: Story = {
  args: {
    ...Primary.args,
  },
}

export const TextButton: Story = {
  args: {
    ...Primary.args,
  },
}
