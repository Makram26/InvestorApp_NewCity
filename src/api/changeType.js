import client from './client'

const getPlotTypes = () => {
    return client.get(
      '/object/plot.inventory/get_unit_types'
    );
};

export default {
    getPlotTypes
}