import { ConnectWallet } from '@thirdweb-dev/react';
import './styles/Home.css';

export default function Home() {
  return (
    <div className="container">
      <div className="connect">
        <ConnectWallet
          dropdownPosition={{
            align: 'center',
            side: 'bottom',
          }}
        />
      </div>
    </div>
  );
}
