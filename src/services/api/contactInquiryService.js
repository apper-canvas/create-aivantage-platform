let contactInquiryData = []

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const contactInquiryService = {
  async getAll() {
    await delay(300)
    return [...contactInquiryData]
  },

  async getById(id) {
    await delay(250)
    const inquiry = contactInquiryData.find(item => item.id === id)
    if (!inquiry) {
      throw new Error('Contact inquiry not found')
    }
    return { ...inquiry }
  },

  async create(inquiryData) {
    await delay(400)
    const newInquiry = {
      ...inquiryData,
      id: Date.now().toString(),
      submissionDate: new Date().toISOString(),
      status: 'new'
    }
    contactInquiryData.unshift(newInquiry)
    return { ...newInquiry }
  },

  async update(id, updateData) {
    await delay(350)
    const inquiryIndex = contactInquiryData.findIndex(item => item.id === id)
    if (inquiryIndex === -1) {
      throw new Error('Contact inquiry not found')
    }
    
    const updatedInquiry = {
      ...contactInquiryData[inquiryIndex],
      ...updateData,
      id
    }
    
    contactInquiryData[inquiryIndex] = updatedInquiry
    return { ...updatedInquiry }
  },

  async delete(id) {
    await delay(300)
    const inquiryIndex = contactInquiryData.findIndex(item => item.id === id)
    if (inquiryIndex === -1) {
      throw new Error('Contact inquiry not found')
    }
    
    const deletedInquiry = contactInquiryData.splice(inquiryIndex, 1)[0]
    return { ...deletedInquiry }
  }
}

export default contactInquiryService