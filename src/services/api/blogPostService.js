import blogPostData from '../mockData/blogPost.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const blogPostService = {
  async getAll() {
    await delay(300)
    return [...blogPostData]
  },

  async getById(id) {
    await delay(250)
    const blogPost = blogPostData.find(item => item.id === id)
    if (!blogPost) {
      throw new Error('Blog post not found')
    }
    return { ...blogPost }
  },

  async create(blogPostData) {
    await delay(400)
    const newBlogPost = {
      ...blogPostData,
      id: Date.now().toString()
    }
    return { ...newBlogPost }
  },

  async update(id, updateData) {
    await delay(350)
    const blogPostIndex = blogPostData.findIndex(item => item.id === id)
    if (blogPostIndex === -1) {
      throw new Error('Blog post not found')
    }
    
    const updatedBlogPost = {
      ...blogPostData[blogPostIndex],
      ...updateData,
      id
    }
    
    blogPostData[blogPostIndex] = updatedBlogPost
    return { ...updatedBlogPost }
  },

  async delete(id) {
    await delay(300)
    const blogPostIndex = blogPostData.findIndex(item => item.id === id)
    if (blogPostIndex === -1) {
      throw new Error('Blog post not found')
    }
    
    const deletedBlogPost = blogPostData.splice(blogPostIndex, 1)[0]
    return { ...deletedBlogPost }
  }
}

export default blogPostService