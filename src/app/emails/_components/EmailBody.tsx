import {Flex} from '@/once-ui/components'
import React, {useEffect, useState} from 'react'
import parse, {attributesToProps, domToReact, Element} from 'html-react-parser';
import type {DOMNode, HTMLReactParserOptions} from 'html-react-parser';

interface EmailBodyProps {
  emailContent: string,
  onHoverOverLink: () => void,
  onLinkClicked: () => void
}

const EmailBody = (props: EmailBodyProps) => {
  const [isClient, setIsClient] = useState(false)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    props.onLinkClicked()
  }

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    props.onHoverOverLink()
  }

  const options: HTMLReactParserOptions = {
    replace(domNode: DOMNode) {
      if (domNode instanceof Element && domNode.name==="head") {
        return <></>
      }

      if (domNode instanceof Element && domNode.name==="body") {
        return <>{domToReact(domNode.children as DOMNode[], options)}</>
      }

      if (domNode instanceof Element && domNode.name==="a") {
        const props = attributesToProps(domNode.attribs)
        return <a
            style={{color: "blue"}}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
            {...props}
        >
          {domToReact(domNode.children as DOMNode[], options)}
        </a>
      }
    },
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
      <Flex
          fillWidth
          fillHeight
          overflowY="scroll"
          direction="column"
          // justifyContent="start"
          // as="body"
      >
        {isClient ? parse(props.emailContent, options) : ""}
      </Flex>
  )
}

export default EmailBody