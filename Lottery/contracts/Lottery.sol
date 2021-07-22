/*********
 * Lottery Contract
 * Variables:
 *     Manager: Address of person who created the contract
 *     Players: Array of addresses of people who have entered
 * Functions:
 *     Enter: Enters a person into the lottery
 *     PickWinner: Randomly pick a winner and sends them the prize pool
**********/
pragma solidity 0^0.4.17;

contract Lottery {
	address public manager;
	address [] public players;

	function Lottery() public {
		manager = msg.sender;
	}

	function Enter() public payable {
		require(msg.value > 0.01 ether);
		players.push(msg.sender);
	}

	function GetPlayers() public view returns (address[]) {
        return players;
    }

	function NumOfPlayers() public view returns (uint) {
		return players.length;
	}

	function GetBalance() public view returns (uint) {
		require(msg.sender == manager);
		return this.balance;
	}

	function random() private view returns (uint) {
		return uint(keccak256(block.difficulty, now, players));
	}

	function PickWinner() public {
		require(msg.sender == manager);
		uint index = random() % players.length;
		players[index].transfer(this.balance);
		players = new address[](0);
	}

}