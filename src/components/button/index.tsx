/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-script-url */
/* eslint-disable no-script-url */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react"
import "./index.css"
import { scramble, unscramble } from "botex"
import { AwesomeButton } from "react-awesome-button"
import "react-awesome-button/dist/styles.css"

export type ButtonType = {
  email?: string
  href?: string
  sameTab?: boolean
  children: React.ReactNode
}

const Button = ({
  email,
  href,
  sameTab = true,
  children,
}: ButtonType): JSX.Element => {
  const key = "abc123xyz"
  const obfuscatedEmail = email ? scramble(email, key) : ""

  const openEmailLink = (): void => {
    window.location.href = `mailto:${unscramble(obfuscatedEmail, key)}`
  }

  return (
    <AwesomeButton
      aria-label={email ? "Email Me" : `Link to ${children}`}
      href={email ? "#" : href}
      onPress={() => email && openEmailLink()}
    >
      {children}
    </AwesomeButton>
  )
}

export default Button
