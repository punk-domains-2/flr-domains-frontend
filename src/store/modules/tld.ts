import { ethers } from 'ethers';
import tldAbi from '../../abi/PunkTLD.json';
import MinterAbi from "../../abi/Minter.json";
import useChainHelpers from "../../hooks/useChainHelpers";

const { getFallbackProvider } = useChainHelpers();

export default {
  namespaced: true,
  
  state: () => ({ 
    discountPercentage: 0,
    tldName: ".flr",
    tldAddress: "0x8C88653A79c6df45472d1d3a25700066A72f034F", // TODO
    tldContract: null,
    tldChainId: 16,
    tldChainName: "Coston Testnet",
    minterAddress: "0xA33dCbE04278706248891931537Dd56B795c3663", // TODO
    minterContract: null,
    minterPaused: true,
    minterTldPrice1: 50000,
    minterTldPrice2: 25000,
    minterTldPrice3: 7749,
    minterTldPrice4: 1999,
    minterTldPrice5: 999
  }),

  getters: { 
    getMinterDiscountPercentage(state) {
      return state.discountPercentage;
    },
    getTldAddress(state) {
      return state.tldAddress;
    },
    getTldContract(state) {
      return state.tldContract;
    },
    getTldChainId(state) {
      return state.tldChainId;
    },
    getTldChainName(state) {
      return state.tldChainName;
    },
    getTldName(state) {
      return state.tldName;
    },
    getMinterAddress(state) {
      return state.minterAddress;
    },
    getMinterContract(state) {
      return state.minterContract;
    },
    getMinterPaused(state) {
      return state.minterPaused;
    },
    getMinterTldPrice1(state) {
      return state.minterTldPrice1;
    },
    getMinterTldPrice2(state) {
      return state.minterTldPrice2;
    },
    getMinterTldPrice3(state) {
      return state.minterTldPrice3;
    },
    getMinterTldPrice4(state) {
      return state.minterTldPrice4;
    },
    getMinterTldPrice5(state) {
      return state.minterTldPrice5;
    }
  },

  mutations: {
    setTldContract(state) {
      let fProvider = getFallbackProvider(state.tldChainId);

      const tldIntfc = new ethers.utils.Interface(tldAbi);
      state.tldContract = new ethers.Contract(state.tldAddress, tldIntfc, fProvider);
    },

    setMinterContract(state, contract) {
      state.minterContract = contract;
    },

    setDiscountPercentage(state, percentage) {
      state.discountPercentage = percentage;
    },

    setMinterPaused(state, paused) {
      state.minterPaused = paused;
    },

    setMinterTldPrice1(state, price) {
      state.minterTldPrice1 = price;
    },
    setMinterTldPrice2(state, price) {
      state.minterTldPrice2 = price;
    },
    setMinterTldPrice3(state, price) {
      state.minterTldPrice3 = price;
    },
    setMinterTldPrice4(state, price) {
      state.minterTldPrice4 = price;
    },
    setMinterTldPrice5(state, price) {
      state.minterTldPrice5 = price;
    },
  },

  actions: {
    async fetchMinterContractData({commit, state}) {
      let fProvider = getFallbackProvider(state.tldChainId);

      // minter contract
      const minterIntfc = new ethers.utils.Interface(MinterAbi);
      const minterContract = new ethers.Contract(state.minterAddress, minterIntfc, fProvider);

      // check if TLD contract is paused
      const paused = await minterContract.paused();
      commit("setMinterPaused", paused);

      // get price for 1 char
      const priceWei1 = await minterContract.price1char();
      const domainPrice1 = ethers.utils.formatEther(priceWei1);
      commit("setMinterTldPrice1", domainPrice1);
      // get price for 2 chars
      const priceWei2 = await minterContract.price2char();
      const domainPrice2 = ethers.utils.formatEther(priceWei2);
      commit("setMinterTldPrice2", domainPrice2);
      // get price for 3 chars
      const priceWei3 = await minterContract.price3char();
      const domainPrice3 = ethers.utils.formatEther(priceWei3);
      commit("setMinterTldPrice3", domainPrice3);
      // get price for 4 chars
      const priceWei4 = await minterContract.price4char();
      const domainPrice4 = ethers.utils.formatEther(priceWei4);
      commit("setMinterTldPrice4", domainPrice4);
      // get price for 5 chars
      const priceWei5 = await minterContract.price5char();
      const domainPrice5 = ethers.utils.formatEther(priceWei5);
      commit("setMinterTldPrice5", domainPrice5);

    }
  }
};