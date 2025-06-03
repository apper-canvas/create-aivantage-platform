import serviceData from '../mockData/service.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const serviceService = {
  async getAll() {
    await delay(300)
    return [...serviceData]
  },

  async getById(id) {
    await delay(250)
    const service = serviceData.find(item => item.id === id)
    if (!service) {
      throw new Error('Service not found')
    }
    return { ...service }
  },

  async create(serviceData) {
    await delay(400)
    const newService = {
      ...serviceData,
      id: Date.now().toString()
    }
    return { ...newService }
  },

  async update(id, updateData) {
    await delay(350)
    const serviceIndex = serviceData.findIndex(item => item.id === id)
    if (serviceIndex === -1) {
      throw new Error('Service not found')
    }
    
    const updatedService = {
      ...serviceData[serviceIndex],
      ...updateData,
      id
    }
    
    serviceData[serviceIndex] = updatedService
    return { ...updatedService }
  },

  async delete(id) {
    await delay(300)
    const serviceIndex = serviceData.findIndex(item => item.id === id)
    if (serviceIndex === -1) {
      throw new Error('Service not found')
    }
    
    const deletedService = serviceData.splice(serviceIndex, 1)[0]
    return { ...deletedService }
  }
}

export default serviceService