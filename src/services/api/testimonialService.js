import testimonialData from '../mockData/testimonial.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const testimonialService = {
  async getAll() {
    await delay(300)
    return [...testimonialData]
  },

  async getById(id) {
    await delay(250)
    const testimonial = testimonialData.find(item => item.id === id)
    if (!testimonial) {
      throw new Error('Testimonial not found')
    }
    return { ...testimonial }
  },

  async create(testimonialData) {
    await delay(400)
    const newTestimonial = {
      ...testimonialData,
      id: Date.now().toString()
    }
    return { ...newTestimonial }
  },

  async update(id, updateData) {
    await delay(350)
    const testimonialIndex = testimonialData.findIndex(item => item.id === id)
    if (testimonialIndex === -1) {
      throw new Error('Testimonial not found')
    }
    
    const updatedTestimonial = {
      ...testimonialData[testimonialIndex],
      ...updateData,
      id
    }
    
    testimonialData[testimonialIndex] = updatedTestimonial
    return { ...updatedTestimonial }
  },

  async delete(id) {
    await delay(300)
    const testimonialIndex = testimonialData.findIndex(item => item.id === id)
    if (testimonialIndex === -1) {
      throw new Error('Testimonial not found')
    }
    
    const deletedTestimonial = testimonialData.splice(testimonialIndex, 1)[0]
    return { ...deletedTestimonial }
  }
}

export default testimonialService