const axios = require('axios');
const utils = require('../helpers/utils');

module.exports = {

    index : async (req, res, next) => {
    try {
        const blocksList = await axios
            .get(global.gConfig.blocksListURL);

        let result = blocksList.data.blocks
            .map(block => ({ hash: block.hash, 
                         height: block.height,
                         time: block.time
                        }));

        const sortedBlocks = result.sort((a,b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        res.status(200).json(utils.paginator(sortedBlocks, req.query.page, req.query.limit));
    } catch (error) {
      console.error(error)
    }
  },
  getBlock : async (req, res, next) => {
    const {hash} = req.value.params;
    const block = await axios.get(global.gConfig.blockDetailsURL + hash);

        
    let tx = block.data.tx.map(tx => ({ inputs: tx.inputs , out: tx.out , 
      totalOutput: tx.out.reduce( function(cnt,o){ return cnt + o.value; }, 0)}));
        
    let newObjBlock = {size: block.data.size, blockIndex: block.data.block_index, 
                    prevBlock: block.data.prev_block ,tx}
    
     res.status(200).json(newObjBlock); 
    }
}