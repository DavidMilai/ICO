import Head from "next/head";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
import Web3Modal from "web3modal";
import { BigNumber, Contract, providers, utils } from "ethers";

export default function Home() {
  const zero = BigNumber.from(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const [tokensMinted, setTokensMintes] = useState(zero);
  const [tokenAmount, setTokenAmount] = useState(zero);

  const [balanceOfCryptoDevTokens, setBalanceOfCryptoDevTokens] =
    useState(zero);

  const renderButton = () => {
    return (
      <div style={{ display: "flex-col" }}>
        <div>
          <input
            type="number"
            placeholder="Amount of Tokens"
            onChange={(e) => setTokenAmount(BigNumber.from(e.target.value))}
          />
          <button
            className={styles.button}
            disabled={!(tokenAmount > 0)}
            onClick={() => mintCryptoDevsToken(tokenAmount)}
          >
            Mint Tokens
          </button>
        </div>
      </div>
    );
  };

  const mintCryptoDevsToken = async (amount) => {
    try {
      const signer = await getProviderOrSigner(true);
      const tokenContract = new Contract();
    } catch (error) {
      console.log(error);
    }
  };

  const getProviderOrSigner = async (needSigner = false) => {
    try {
      const provider = await web3ModalRef.current.connect();
      const web3Provider = new providers.Web3Provider(provider);

      const { chainId } = await web3Provider.getNetwork();

      if (chainId !== 5) {
        window.alert("Change the network to Goerli");
        throw new Error("Change network to Goerli");
      }

      if (needSigner) {
        const signer = web3Provider.getSigner();
        return signer;
      }
      return web3Provider;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      ConnectWallet();
    }
  }, []);

  const ConnectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Head>
        <title>Crypto Devs ICO</title>
        <meta name="description" content="ICO-dAPP" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Crypto Devs ICO</h1>
          <div className={styles.description}>
            You can claim or mint Crypto Dev tokens here
          </div>
          {walletConnected ? (
            <div>
              <div className={styles.description}>
                You have minted{utils.formatEther(balanceOfCryptoDevTokens)}{" "}
                Crypto Dev tokens here
              </div>
              <div className={styles.description}>
                overall {utils.formatEther(tokensMinted)}/1000 have been minted
              </div>
              {renderButton()}
            </div>
          ) : (
            <button onClick={ConnectWallet} className={styles.button}>
              Connect Your Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
