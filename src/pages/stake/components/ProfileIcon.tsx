import { useState } from "react"
import { ReactComponent as Iq } from "styles/images/Iq.svg"
import styles from "./ProfileIcon.module.scss"

interface Props {
  src?: string
  size: number
}

const ProfileIcon = ({ src, size }: Props) => {
  const [error, setError] = useState(false)
  const attrs = { className: styles.icon, width: size, height: size }
  if (error || !src) return <Iq {...attrs} />
  return <img {...attrs} src={src} onError={() => setError(true)} alt="" />
}

export default ProfileIcon
