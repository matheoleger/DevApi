export async function updateTask() {
    return await Task.findByIdAndUpdate(ctx.params.id, ctx.request.body, {runValidators: true})
}