import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Web3 } from 'web3';

export const Web3Context = createContext({});

const Web3Provider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [account, setAccount] = useState('');

  const ethRef = useRef(window.ethereum);
  const web3Ref = useRef(null);

  const handleConnectedAccount = useCallback(
    async (accounts) => {
      if (accounts.length === 0) return;

      const [currentAccount] = accounts;

      if (currentAccount !== account) {
        setAccount(currentAccount);
      }

      return currentAccount;
    },
    [account]
  );

  const requestAccounts = async () => {
    if (!isEnabled) {
      throw new Error(
        'No Provider detected, use a with browser with Metamask installed'
      );
    }

    const accounts = await ethRef.current?.request({
      method: 'eth_requestAccounts',
    });

    return handleConnectedAccount(accounts);
  };

  useEffect(() => {
    if (!ethRef.current) return;

    web3Ref.current = new Web3(ethRef.current);
    const provider = web3Ref.current.provider;
    const ACCOUNTS_CHANGED_EVENT = 'accountsChanged';

    const onAccountsChanged = async (accounts) => {
      await handleConnectedAccount(accounts);
    };

    provider.on(ACCOUNTS_CHANGED_EVENT, handleConnectedAccount);
    setIsEnabled(true);

    return () => {
      provider.removeListener(ACCOUNTS_CHANGED_EVENT, onAccountsChanged);
    };
  }, [handleConnectedAccount]);

  return (
    <Web3Context.Provider
      value={{
        account,
        isEnabled: isEnabled && ethRef.current,
        requestAccounts,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Web3Provider;
