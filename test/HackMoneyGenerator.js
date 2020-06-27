const chai = require('chai');
const { expect } = chai;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const { accounts, contract } = require('@openzeppelin/test-environment');
const { singletons, BN } = require('@openzeppelin/test-helpers');

const HackMoneyGenerator = contract.fromArtifact('HackMoneyGenerator');
const HackMoney = contract.fromArtifact('HackMoney');

describe('HackMoneyGenerator', function () {
  const [ owner, user1 ] = accounts;

  beforeEach(async function() {
    await singletons.ERC1820Registry(owner);
    this.decimals = (new BN("10")).pow(new BN('18'));
    const initialTokens = (new BN(10000)).mul(this.decimals);
    this.token = await HackMoney.new("HackMoney", "H4KR", owner, initialTokens.toString(), { from: owner });
    const sendVal = (new BN(1000)).mul(this.decimals);
    await this.token.transfer(user1, sendVal.toString(), { from: owner }); 
    this.contract = await HackMoneyGenerator.new(this.token.address, { from: owner });
  });

  describe('initialization', function() {
    beforeEach(async function() {
      this.rate = await this.contract.rate();
      this.contract_owner = await this.contract.owner();
    });
    it('the deployer is the owner', async function () {
      expect(await this.contract_owner).to.equal(owner);
    });

    it('should initialize with a rate of 100 Ethers', async function() {
      const val = 100 * Math.pow(10, 18);
      expect(this.rate).to.be.bignumber.equal(new BN(val.toString()));
    });
  });

  describe('update rate', function() {
    beforeEach(async function() {
      this.val = new BN((100 * Math.pow(10, 18)).toString());
    });
    it('should fail if not done by owner', function() {
        return expect(
          this.contract.updateRate(this.val.toString(), { from: user1 })
        ).to.eventually.be.rejectedWith(
          "Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner."
        )
    });
    it('should pass if done by owner', async function() {
        await this.contract.updateRate(this.val.toString(), { from: owner });
        const rate = await this.contract.rate();
        return expect(rate).to.be.bignumber.equal(this.val);
    });
  });

  describe('createMoney', function() {
    beforeEach(function() {
      this.val  = (new BN(10000)).mul(this.decimals);
      this.burn  = (new BN(100)).mul(this.decimals);
      this.create = async (from) => {
        const result = await this.contract.createMoney(
          "Foo", "F", this.val.toString(), this.burn.toString(), { from }
        );
        return result;
      };
    });
    it('should fail if contract is not approved', function() {
        return expect(
          this.create(user1)
        ).to.eventually.be.rejectedWith(
          "Returned error: VM Exception while processing transaction: revert ERC777: transfer amount exceeds allowance -- Reason given: ERC777: transfer amount exceeds allowance."
        )
    });

    describe('on success', function() {
      beforeEach(async function() {
          await this.token.balanceOf(user1, { from: user1 });
          await this.token.approve(this.contract.address, this.burn.toString(), { from: user1 });
          await this.token.allowance(user1, this.contract.address, { from: user1 });
          await this.create(user1);
      });
      it('should pass if contract is approved', async function() {
          const result = await this.token.balanceOf(user1, { from: user1 });
          const whats_left = (new BN(900)).mul(this.decimals);
          return expect(result.toString()).to.be.bignumber.equal(whats_left);
      });
      it('should store H4KR tokens in contract', async function() {
          const result = await this.token.balanceOf(this.contract.address, { from: user1 });
          const current = (new BN(100)).mul(this.decimals);
          expect(result.toString()).to.be.bignumber.equal(current);
      });
      it('should allow anyone to burn stored tokens', async function() {
          const result1 = await this.token.balanceOf(this.contract.address, { from: user1 });
          await this.contract.burn(result1.toString());
          const result = await this.token.balanceOf(this.contract.address, { from: user1 });
          const current = (new BN(0)).mul(this.decimals);
          expect(result.toString()).to.be.bignumber.equal(current);
      });
    });
  });
});
