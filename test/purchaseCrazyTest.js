const { assert } = require('chai');

// const Purchase = artifacts.require('./Purchase.sol')
const Purchase = require( '../client/src/abis/Purchase2.json');
const Release = artifacts.require('./Release2.sol')

require('chai').use(require('chai-as-promised')).should()

contract('Purchase transaction: double purchase test', ([owner,buyer1,buyer2,buyer3,buyer4,buyer5,
                                                                        buyer6,buyer7,buyer8,buyer9,buyer0])=>{

  const gasLimit = 30000000
  const offer = 1000000000000000;
  let instance, address;
  let originPurchaseBalance;
  let deployGasFee;
  let release,releaseAddress;


  describe('combo', async() => {

    before(async() => {
      release = await Release.deployed()
      releaseAddress = await release.address;
      await release.uploadImage("as", '0x1234','0xdef',{from: owner})
      await release.uploadImage("sa", '0x5678','0xabc',{from: owner})
      console.log("release addr = " + releaseAddress)
    })
  
    it('1 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer1, owner, owner ,3600, "0x1234"],
      }).send({ from:buyer1, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      // console.log(await release.images(1))
      result = await contract.methods.confirmPurchase().send({ from: owner ,gasLimit:250000})
      assert.equal(await release.getImageOwner(1), buyer1,"owner right!")
    })
    it('2 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer2, buyer1, owner ,3600, "0x1234"],
      }).send({ from:buyer2, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      result = await contract.methods.confirmPurchase().send({ from: buyer1 ,gasLimit:250000})
    })
    it('3 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer3, buyer2, owner ,3600, "0x1234"],
      }).send({ from:buyer3, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      result = await contract.methods.confirmPurchase().send({ from: buyer2 ,gasLimit:250000})
    })
    it('4 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer4, buyer3, owner ,3600, "0x1234"],
      }).send({ from:buyer4, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      result = await contract.methods.confirmPurchase().send({ from: buyer3 ,gasLimit:250000})
    })
    it('5 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer5, buyer4, owner ,3600, "0x1234"],
      }).send({ from:buyer5, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      result = await contract.methods.confirmPurchase().send({ from: buyer4 ,gasLimit:250000})
    })
    it('6 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer6, buyer5, owner ,3600, "0x1234"],
      }).send({ from:buyer6, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      result = await contract.methods.confirmPurchase().send({ from: buyer5 ,gasLimit:300000})
    })
    it('7 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer7, buyer6, owner ,3600, "0x1234"],
      }).send({ from:buyer7, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      result = await contract.methods.confirmPurchase().send({ from: buyer6 ,gasLimit:300000})
    })
    it('8 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer8, buyer7, owner ,3600, "0x1234"],
      }).send({ from:buyer8, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      result = await contract.methods.confirmPurchase().send({ from: buyer7 ,gasLimit:300000})
    })
    it('9 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer9, buyer8, owner ,3600, "0x1234"],
      }).send({ from:buyer9, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      result = await contract.methods.confirmPurchase().send({ from: buyer8 ,gasLimit:350000})
    })
    it('10 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer1, buyer9, owner ,3600, "0x1234"],
      }).send({ from:buyer1, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      result = await contract.methods.confirmPurchase().send({ from: buyer9 ,gasLimit:350000})
    })
    it('11 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer2, buyer1, owner ,3600, "0x1234"],
      }).send({ from:buyer2, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      result = await contract.methods.confirmPurchase().send({ from: buyer1 ,gasLimit:350000})
    })
    it('12 tx', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer3, buyer2, owner ,3600, "0x1234"],
      }).send({ from:buyer3, value: offer})
      // console.log(result.options.data)
      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }
      result = await contract.methods.confirmPurchase().send({ from: buyer2 ,gasLimit:350000})
    })

    it('final check', async() => {
      instance = new web3.eth.Contract(Purchase.abi,{
        gasLimit:gasLimit,
      })
      // console.log(instance)
      const ob  = await web3.eth.getBalance(owner)
      const by4 = await web3.eth.getBalance(buyer4)
      const by3 = await web3.eth.getBalance(buyer3)
      const by2 = await web3.eth.getBalance(buyer2)
      const by1 = await web3.eth.getBalance(buyer1)
      const by9 = await web3.eth.getBalance(buyer9)
      const by8 = await web3.eth.getBalance(buyer8)
      const by7 = await web3.eth.getBalance(buyer7)

      let result = await instance.deploy({
        data: Purchase.bytecode,
        arguments:[releaseAddress, 1, buyer4, buyer3, owner ,3600, "0x1234"],
      }).send({ from:buyer4, value: offer})

      const by4ad = await web3.eth.getBalance(buyer4)

      address = result.options.address
      let contract = new web3.eth.Contract(Purchase.abi, address)
      for(let i=0;i<5;i++) {
        console.log("PO"+i+" = "+await contract.methods.prevOwners(i).call())
      }


      result = await contract.methods.confirmPurchase().send({ from: buyer3 ,gasLimit:350000})
      gasUsed = parseInt(result.gasUsed)
      effectiveGasPrice = parseInt(web3.utils.toBN(result.effectiveGasPrice))
      GasFee = BigInt(gasUsed * effectiveGasPrice)

      const oa   = await web3.eth.getBalance(owner)
      const by4a = await web3.eth.getBalance(buyer4)
      const by3a = await web3.eth.getBalance(buyer3)
      const by2a = await web3.eth.getBalance(buyer2)
      const by1a = await web3.eth.getBalance(buyer1)
      const by9a = await web3.eth.getBalance(buyer9)
      const by8a = await web3.eth.getBalance(buyer8)
      const by7a = await web3.eth.getBalance(buyer7)

      console.log("Owner delta:" + (BigInt(oa)-BigInt(ob)))
      console.log("Buyer7 delta:" + (BigInt(by7a)-BigInt(by7)))
      console.log("Buyer8 delta:" + (BigInt(by8a)-BigInt(by8)))
      console.log("Buyer9 delta:" + (BigInt(by9a)-BigInt(by9)))
      console.log("Buyer1 delta:" + (BigInt(by1a)-BigInt(by1)))
      console.log("Buyer2 delta:" + (BigInt(by2a)-BigInt(by2)))

      console.log("Buyer3 delta:" + (BigInt(by3a)-BigInt(by3)))
      console.log("confirm gas used:" + GasFee)

      console.log("Buyer4 begin:" + by4)
      console.log("Buyer4 after deploy:" + by4ad)
      console.log("Buyer4 after all:" + by4)

    })
    
  })

})