import React, { FC } from "react"
import ReactMarkdown, { ExtraProps } from "react-markdown"
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

type Props = {
  content: string
}

// Reads an ```embed fence: the first line is the iframe URL, the rest is its title.
const getEmbed = (node: ExtraProps["node"]): { src: string; title: string } | null => {
  const code = node?.children[0]
  if (code?.type !== "element" || code.tagName !== "code") return null
  const { className } = code.properties
  if (!Array.isArray(className) || !className.includes("language-embed")) return null

  const text = code.children.map((child) => (child.type === "text" ? child.value : "")).join("")
  const [src = "", ...titleLines] = text.trim().split("\n")
  return { src: src.trim(), title: titleLines.join(" ").trim() || "Embedded content" }
}

const Markdown: FC<Props> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h2: ({ ...props }) => <h2 className="mt-10 mb-4 text-4xl font-semibold" {...props} />,

        h3: ({ ...props }) => <h3 className="mt-8 mb-4 text-3xl font-semibold" {...props} />,

        p: ({ ...props }) => <p className="my-4 leading-8" {...props} />,

        ul: ({ ...props }) => (
          <ul className="my-4 ml-6 list-disc space-y-2 marker:text-foreground" {...props} />
        ),

        ol: ({ ...props }) => (
          <ol className="my-4 ml-6 list-decimal space-y-2 marker:text-foreground" {...props} />
        ),

        li: ({ ...props }) => <li className="pl-1 leading-8" {...props} />,

        a: ({ ...props }) => (
          <a
            className="underline underline-offset-4 transition-opacity hover:opacity-80"
            {...props}
          />
        ),

        img: ({ ...props }) => (
          <img alt="" className="m-auto my-4 max-w-full md:max-w-[600px]" {...props} /> // eslint-disable-line @next/next/no-img-element
        ),
        pre: ({ node, children, ...props }) => {
          const embed = getEmbed(node)
          if (!embed) return <pre {...props}>{children}</pre>

          // The height follows the marketbots topology embed's layout. Below 594px wide it
          // shows a tall 380×704 diagram (max 440px wide), and above that a wide 960×570 one.
          // The extra 34px of width and 96px of height are its border, padding and header.
          return (
            <div className="@container my-6 w-full">
              <iframe
                className="h-[calc(min(100cqw_-_34px,440px)_*_704_/_380_+_96px)] w-full rounded-xl @min-[594px]:h-[calc((100cqw_-_34px)_*_570_/_960_+_96px)]"
                loading="lazy"
                src={embed.src}
                title={embed.title}
              />
            </div>
          )
        },
        code(props) {
          const { children, className, node, ...rest } = props // eslint-disable-line unused-imports/no-unused-vars
          const match = /language-(\w+)/.exec(className || "")
          return match ? (
            // @ts-ignore
            <SyntaxHighlighter
              {...rest}
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              PreTag="div"
              style={darcula}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default Markdown
