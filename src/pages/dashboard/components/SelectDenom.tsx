import { useTranslation } from "react-i18next"
import { isDenomIqNative } from "@web4/hubble-utils"
import { WithTokenItem } from "data/token"
import { ModalButton } from "components/feedback"
import { TokenCard, TokenCardGrid } from "components/token"

interface Item extends CoinData {
  value?: Value
}

interface Props {
  title: string
  list: Item[]
}

const SelectDenom = ({ title, list }: Props) => {
  const { t } = useTranslation()

  return (
    <ModalButton
      title={title}
      renderButton={(open) => <button onClick={open}>{t("Show all")}</button>}
    >
      <TokenCardGrid maxHeight>
        {list
          .filter(({ denom }) => isDenomIqNative(denom))
          .map(({ amount, denom, value }) => (
            <WithTokenItem token={denom} key={denom}>
              {(item) => (
                <TokenCard
                  {...item}
                  amount={amount}
                  value={value}
                  valueConfig={{ prefix: true }}
                  name="" // remove name
                  prefix
                />
              )}
            </WithTokenItem>
          ))}
      </TokenCardGrid>
    </ModalButton>
  )
}

export default SelectDenom
