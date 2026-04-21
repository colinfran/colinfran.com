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
      fill="none"
      height="800"
      viewBox="0 0 24 24"
      width="800"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.822 5.134A4.75 4.75 0 0 1 15.648 2h-.919m2.093 3.134a4.77 4.77 0 0 0 3.605 1.649v3.436a8.17 8.17 0 0 1-4.78-1.537v6.989c0 3.492-2.839 6.329-6.323 6.329-1.824 0-3.47-.78-4.626-2.02A6.3 6.3 0 0 1 3 15.67c0-3.44 2.756-6.245 6.17-6.32m7.652-4.216-.054-.035M6.986 17.352a2.86 2.86 0 0 1-.548-1.686 2.89 2.89 0 0 1 2.886-2.888c.297 0 .585.05.854.134v-3.51a6 6 0 0 0-.854-.06c-.051 0-.462.027-.513.027M14.724 2H12.21l-.005 13.778a2.89 2.89 0 0 1-2.881 2.781 2.9 2.9 0 0 1-2.343-1.203"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5px"
      ></path>
    </svg>
  ),
  X: (props: IconProps) => (
    <svg
      {...props}
      className="size-4 transition-all"
      stroke="currentColor"
      strokeWidth=".25px"
      viewBox="0 0 24 24"
    >
      <path
        d="M14.095479,10.316482L22.286354,1h-1.940718l-7.115352,8.087682L7.551414,1H1l8.589488,12.231093L1,23h1.940717  l7.509372-8.542861L16.448587,23H23L14.095479,10.316482z M11.436522,13.338465l-0.871624-1.218704l-6.924311-9.68815h2.981339  l5.58978,7.82155l0.867949,1.218704l7.26506,10.166271h-2.981339L11.436522,13.338465z"
        fill="currentColor"
      />
    </svg>
  ),
  Apple: (props: IconProps) => (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  ),
}

export type Icon = keyof typeof Icons
