const erisDbFactory = require('eris-db');
const erisContracts = require('eris-contracts');
const solc = require('solc');
const accounts = require("./accountsDeveloper.js").accounts;
const nodes = require("./ips.js").ips;

var erisdb; /* ErisDB Factory */
var erisdbURL; /* ErisDB RPC URL */
var pipe; /* Pipe for creating contracts */
var contractManager;/* Contract Manager for creating contracts*/
var account = accounts[0].address;
var builderSource = 'contract BuildingManager { uint public contAddress; mapping(uint => address) builderMapper; mapping(int => bool) builderMapper2; mapping(int => bool) funcionariosRegistradores; mapping(int => address) idBuildingAaddress; function BuildingManager(){ contAddress = 0; funcionariosRegistradores[0] = true; funcionariosRegistradores[1] = true; funcionariosRegistradores[2] = true; funcionariosRegistradores[3] = true; funcionariosRegistradores[4] = true; } function createBuilding (string owner, int idBuilding, int idFuncionario, int date) private returns (address) { address newBuilding = new Building(owner, idBuilding, idFuncionario, date); builderMapper[contAddress] = newBuilding; contAddress++; builderMapper2[idBuilding] = true; return newBuilding; } function getCounter () returns (uint) { return contAddress; } function existBuilding(int idBuilding) returns (bool){ return builderMapper2[idBuilding]; } function buildingValidator (string owner, int idBuilding, int idFuncionario, int date) returns (bool){ if (existBuilding(idBuilding) != true && funcionariosRegistradores[idFuncionario]){ createBuilding (owner, idBuilding, idFuncionario, date); return true; }else{ return false; } } function sellBuilding (string owner) returns (bool){ } function buyBuilding () returns (bool){ } } contract Building { string owner; int idBuilding; int idFuncionario; int date; function Building (string _owner, int _idBuilding, int _idFuncionario, int _date) { owner = _owner; idBuilding = _idBuilding; idFuncionario = _idFuncionario; date = _date; } }';

/*Initialize ERISDB*/
erisdb = erisDbFactory.createInstance(nodes[0]);
erisdb.start(function(error){
    if(!error){
        console.log("Ready to go");
    }
});

pipe = new erisContracts.pipes.DevPipe(erisdb, accounts); /* Create a new pipe*/
contractManager = erisContracts.newContractManager(pipe); /*Create a new contract object using the pipe */

/* Compile the Greeter Contract*/
var compiledContract = solc.compile(builderSource);
//console.log(compiledContract)


var contractFactory = contractManager.newContractFactory(JSON.parse(compiledContract.contracts.BuildingManager.interface)); //parameter is abi
//console.log(contractFactory);


contractFactory.new.apply(contractFactory, [{from: account, data:compiledContract.contracts.BuildingManager.bytecode}, (err, contractInstance)=> {
  console.log(contractInstance.address);
    /*
  contractInstance["greet"].apply(contractInstance, [(error,result)=> {
     if (error) {
       console.log(error);
     }
    else {
      console.log(result);
    }

  }]);
  */
 }]);
