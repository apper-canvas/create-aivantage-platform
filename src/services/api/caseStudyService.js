import caseStudyData from '../mockData/caseStudy.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const caseStudyService = {
  async getAll() {
    await delay(300)
    return [...caseStudyData]
  },

  async getById(id) {
    await delay(250)
    const caseStudy = caseStudyData.find(item => item.id === id)
    if (!caseStudy) {
      throw new Error('Case study not found')
    }
    return { ...caseStudy }
  },

  async create(caseStudyData) {
    await delay(400)
    const newCaseStudy = {
      ...caseStudyData,
      id: Date.now().toString()
    }
    return { ...newCaseStudy }
  },

  async update(id, updateData) {
    await delay(350)
    const caseStudyIndex = caseStudyData.findIndex(item => item.id === id)
    if (caseStudyIndex === -1) {
      throw new Error('Case study not found')
    }
    
    const updatedCaseStudy = {
      ...caseStudyData[caseStudyIndex],
      ...updateData,
      id
    }
    
    caseStudyData[caseStudyIndex] = updatedCaseStudy
    return { ...updatedCaseStudy }
  },

  async delete(id) {
    await delay(300)
    const caseStudyIndex = caseStudyData.findIndex(item => item.id === id)
    if (caseStudyIndex === -1) {
      throw new Error('Case study not found')
    }
    
    const deletedCaseStudy = caseStudyData.splice(caseStudyIndex, 1)[0]
    return { ...deletedCaseStudy }
  }
}

export default caseStudyService