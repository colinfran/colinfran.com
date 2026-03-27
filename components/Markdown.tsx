import React, { FC } from "react"
import ReactMarkdown from "react-markdown"
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"

type Props = {
  content: string
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
        code(props) {
          const { children, className, node, ...rest } = props // eslint-disable-line unused-imports/no-unused-vars
          const match = /language-(\w+)/.exec(className || "")
          return match ? (
            // @ts-ignore
            <SyntaxHighlighter
              {...rest}
              children={String(children).replace(/\n$/, "")} // eslint-disable-line react/no-children-prop
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
