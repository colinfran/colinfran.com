import React, { HTMLAttributes } from "react"
import { Github, Instagram, Linkedin, Mail, Loader2, NotebookPen } from "lucide-react"

type IconProps = HTMLAttributes<SVGElement>

export const Icons = {
  Loader: (props: IconProps) => <Loader2 className="animate-spin" {...props} strokeWidth={1.5} />,
  Github: (props: IconProps) => <Github {...props} strokeWidth={1.5} />,
  Instagram: (props: IconProps) => <Instagram {...props} strokeWidth={1.5} />,
  Linkedin: (props: IconProps) => <Linkedin {...props} strokeWidth={1.5} />,
  Email: (props: IconProps) => <Mail {...props} strokeWidth={1.5} />,
  Blog: (props: IconProps) => <NotebookPen {...props} strokeWidth={1.5} />,
  TikTok: (props: IconProps) => (
    <svg
      {...props}
      className="size-3 transition-all"
      role="img"
      stroke="currentColor"
      strokeWidth="1.5px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>TikTok</title>
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  ),
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
