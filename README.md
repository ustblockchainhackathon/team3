# team3

```
  "hackathon_developer_003": {
    "address": "F8F9DD0D144CA0ABC465E83A9068EE4CD43C292D",
    "pubKey": "BA22B285B967183A00E218D7C20E063A362CDBB054B38B1411B7F22CCF4F5B2D",
    "privKey": "851EC74C0B627F4BDDB71CBA6E6F3F0ACD3EEE79B1EB898C49F885094BD9BA71BA22B285B967183A00E218D7C20E063A362CDBB054B38B1411B7F22CCF4F5B2D"
  },
  "hackathon_participant_009": {
    "address": "7DB711C437463CF0A4C2A192D76DCAB8FF212CEE",
    "pubKey": "EE5837D8DE6ADD62F47E069EE91A1984804E56DF886CC805C3AC6B7F0F2663F9",
    "privKey": "F0A057528EC5285684C52EC8D59BBB828ACC728230461C59E85FA27A53F8E4EAEE5837D8DE6ADD62F47E069EE91A1984804E56DF886CC805C3AC6B7F0F2663F9"
  },
  "hackathon_participant_010": {
    "address": "40859E78CB0A3EF1FB2E8D2D50F5F516F54BD1E0",
    "pubKey": "F6A151325266BCCF47153FBF15284135C8AB4A82DD9E81D9B2F3EA4421A28B9A",
    "privKey": "65339EC1C061390F152C511B1D9C563B10FF884C778A8202D3AD47134B5E0CFAF6A151325266BCCF47153FBF15284135C8AB4A82DD9E81D9B2F3EA4421A28B9A"
  },
  "hackathon_participant_011": {
    "address": "770145D08A5C44491A21C84221678AA6BEF27D2B",
    "pubKey": "491B96FCEE2F01E65927B8D932BDD109BC2F95277D59E0B6C1650831B081F0E9",
    "privKey": "7B0E5DFB362574C8A3E06097CD0E90CB27649897E99A082FA103403FB2907A32491B96FCEE2F01E65927B8D932BDD109BC2F95277D59E0B6C1650831B081F0E9"
  }

node = "http://134.168.62.175:1337/rpc"

compiler = "http://134.168.56.175:9099"


Last Contract:

contract BuildingManager {
  
uint public contAddress;
mapping(uint => address) builderMapper;
mapping(int => bool) builderMapper2;
mapping(int => bool) funcionariosRegistradores;
mapping(int => address) idBuildingAaddress;

function BuildingManager(){
   contAddress = 0;
   funcionariosRegistradores[0] = true;
   funcionariosRegistradores[1] = true;
   funcionariosRegistradores[2] = true;
   funcionariosRegistradores[3] = true;
   funcionariosRegistradores[4] = true;
}


function createBuilding (string owner, int idBuilding, int idFuncionario, int date) private returns (address) {
  address newBuilding = new Building(owner, idBuilding, idFuncionario, date);
  builderMapper[contAddress] = newBuilding;
  contAddress++;
  builderMapper2[idBuilding] = true;
  idBuildingAaddress[idBuilding] = newBuilding;
  return newBuilding;
}

function getCounter () returns (uint) {
  return contAddress;
}


function existBuilding(int idBuilding) returns (bool){
   return builderMapper2[idBuilding];
  
}

function buldingValidator (string owner, int idBuilding, int idFuncionario, int date) returns (bool){
  
  if (existBuilding(idBuilding) != true && funcionariosRegistradores[idFuncionario]){
      createBuilding (owner, idBuilding, idFuncionario, date);
      return true;
  }else{
      return false;
  }
}

function sellBuyBuilding (int idBuilding, string newOwner) returns (bool){
   address direccion = idBuildingAaddress[idBuilding];
   if (direccion != 0){
       Building casita = Building(direccion);
       casita.setOwner(newOwner);
       return true;
   }
       return false;
   }
}
contract Building {
   
string owner;
int idBuilding;
int idFuncionario;
int date;

  function Building (string _owner, int _idBuilding, int _idFuncionario, int _date) {
      owner = _owner;
      idBuilding = _idBuilding;
      idFuncionario = _idFuncionario;
      date = _date;
  }
  function setOwner (string newOwner){
      owner = newOwner;
  }
}
