import { useQuery } from "react-query"
import { isDenomIBC } from "@web4/hubble-utils"
import { queryKey, RefetchOptions } from "../query"
import { useLCDClient } from "./lcdClient"

export const useIBCBaseDenom = (denom: Denom, enabled: boolean) => {
  const lcd = useLCDClient()

  return useQuery(
    [queryKey.ibc.denomTrace, denom],
    async () => {
      const { base_denom } = await lcd.ibcTransfer.denomTrace(
        denom.replace("ibc/", "")
      )

      return base_denom
    },
    { ...RefetchOptions.INFINITY, enabled: isDenomIBC(denom) && enabled }
  )
}
