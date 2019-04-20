import configDev from "./config_dev";
import configProd from "./config_prod";

var config: any = null;

console.log("environnement node");
console.log(process.env.config);
console.log("environnement dev");
console.log(configDev);

switch (process.env.config) {
	case 'prod':
		config = configProd;
		break;
	case 'dev':
		config = configDev;
		break;
	default:
		config = configDev;
}

console.log("environnement config");
console.log(config);
export {
	config
}
