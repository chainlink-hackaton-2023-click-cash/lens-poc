import {
  useAddress,
  useNetworkMismatch,
  ConnectWallet,
  useSwitchChain,
  ChainId,
} from '@thirdweb-dev/react';
import React from 'react';

type Props = {};

export default function SignInButton({}: Props) {
  const address = useAddress();
  const isOnWrongNetwork = useNetworkMismatch();
  const switchChain = useSwitchChain();

  if (!address) {
    return (
      <ConnectWallet
        dropdownPosition={{
          align: 'center',
          side: 'bottom',
        }}
      />
    );
  }

  if (isOnWrongNetwork) {
    return (
      <button onClick={() => switchChain(ChainId.Mumbai)}>
        Switch network
      </button>
    );
  }
}
