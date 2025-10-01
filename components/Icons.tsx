import React, { HTMLAttributes } from "react"
import { Github, Instagram, Linkedin, Mail, Loader2 } from "lucide-react"

type IconProps = HTMLAttributes<SVGElement>

export const Icons = {
  Loader: (props: IconProps) => <Loader2 className="animate-spin" {...props} strokeWidth={1.5} />,
  Github: (props: IconProps) => <Github {...props} strokeWidth={1.5} />,
  Instagram: (props: IconProps) => <Instagram {...props} strokeWidth={1.5} />,
  Linkedin: (props: IconProps) => <Linkedin {...props} strokeWidth={1.5} />,
  Email: (props: IconProps) => <Mail {...props} strokeWidth={1.5} />,
  X: (props: IconProps) => (
    <svg
      {...props}
      className="size-3 transition-all"
      stroke="currentColor"
      strokeWidth=".25px"
      viewBox="0 0 24 24"
      width="16px"
    >
      <path
        d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"
        fill="currentColor"
      />
    </svg>
  ),
}

export type Icon = keyof typeof Icons
