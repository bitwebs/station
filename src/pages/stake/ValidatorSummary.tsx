import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { readPercent } from "@web4/hubble-utils"
import { IqValidator } from "types/validator"
import { calcSelfDelegation } from "data/Iq/IqAPI"
import { useUptime } from "data/Iq/IqAPI"
import { Card } from "components/layout"
import Uptime from "./components/Uptime"
import ValidatorNumbers from "./components/ValidatorNumbers"

const ValidatorSummary = ({ validator }: { validator: IqValidator }) => {
  const { t } = useTranslation()

  const { data: uptime, ...uptimeState } = useUptime(validator)

  const contents = useMemo(() => {
    if (!uptime) return []

    return [
      {
        title: t("Self delegation"),
        content: readPercent(calcSelfDelegation(validator)),
      },
      {
        title: `${t("Uptime")} (${t("Last 10k blocks")})`,
        content: <Uptime>{uptime}</Uptime>,
      },
    ]
  }, [t, uptime, validator])

  return (
    <Card {...uptimeState}>
      {contents && <ValidatorNumbers contents={contents} />}
    </Card>
  )
}

export default ValidatorSummary
