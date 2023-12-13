import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Web3 } from 'web3';

export const Web3Context = createContext(null);

const Web3Provider = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [account, setAccount] = useState('');

  const ethRef = useRef(window.ethereum);
  const web3Ref = useRef(null);
  const contract = useRef(null);

  const handleConnectedAccount = useCallback(
    async (accounts) => {
      const currentAccount = accounts[0] ?? '';

      if (currentAccount !== account) {
        setAccount(currentAccount);
      }
    },
    [account]
  );

  const requestAccounts = useCallback(async () => {
    if (!isEnabled) {
      throw new Error(
        'No Provider detected, use a with browser with Metamask installed'
      );
    }

    const accounts = await ethRef.current?.request({
      method: 'eth_requestAccounts',
    });

    return handleConnectedAccount(accounts);
  }, [handleConnectedAccount, isEnabled]);

  useEffect(() => {
    if (!ethRef.current) return;

    const connectContract = async (web3) => {
      contract.current = await new window.web3.eth.Contract(ABI, Address);
    };

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

  const isEnabledForWeb3 = isEnabled && ethRef.current;

  const value = useMemo(
    () => ({
      account,
      isEnabled: isEnabledForWeb3,
      isConnected: Boolean(account),
      requestAccounts,
    }),
    [account, isEnabledForWeb3, requestAccounts]
  );

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

Web3Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Web3Provider;
